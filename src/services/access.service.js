"use strict";

import ShopModel from "../models/shop.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Roles } from "../utils/constantType";
import KeyTokenService from "./keyToken.service";
import {
  createTokenPair,
  getPrivateKey,
  getPublicKey,
} from "../auth/authUtils";
import { getInfoData } from "../utils";
import { AuthFailureError, BadRequestError } from "../core/error.response";
import ShopService from "./shop.service";

class AccessService {
  static signIn = async ({ email, password, refreshToken = null }) => {
    const existShop = await ShopService.findByEmail({ email });

    if (!existShop) {
      throw new BadRequestError("Error: Shop not registered!");
    }

    const match = await bcrypt.compare(password, existShop.password);

    if (!match) throw new AuthFailureError("Authentication error!");

    const privateKey = getPrivateKey();
    const publicKey = getPublicKey();

    const { publicKeyString } = await KeyTokenService.upsertKeyToken({
      userId: existShop._id,
      publicKey,
    });

    if (!publicKeyString) {
      throw new ConflictRequestError("PublicKeyString error!");
    }

    const publicKeyObject = crypto.createPublicKey(publicKeyString);
    const privateKeyObject = crypto.createPrivateKey(privateKey);

    const tokens = await createTokenPair(
      { userId: existShop._id, email },
      publicKeyObject,
      privateKeyObject
    );

    return {
      shop: getInfoData({
        fields: ["_id", "name", "email"],
        object: existShop,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    const holderShop = await ShopModel.findOne({ email }).lean();

    if (holderShop) {
      throw new BadRequestError("Error: Shop already registered!");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newShop = await ShopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [Roles.SHOP],
    });

    if (newShop) {
      const privateKey = getPrivateKey();
      const publicKey = getPublicKey();

      const { publicKeyString } = await KeyTokenService.upsertKeyToken({
        userId: newShop._id,
        publicKey,
      });

      if (!publicKeyString) {
        throw new ConflictRequestError("PublicKeyString error!");
      }

      const publicKeyObject = crypto.createPublicKey(publicKeyString);
      const privateKeyObject = crypto.createPrivateKey(privateKey);

      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKeyObject,
        privateKeyObject
      );

      return {
        shop: getInfoData({
          fields: ["_id", "name", "email"],
          object: newShop,
        }),
        tokens,
      };
    }

    return null;
  };

  static logout = async ({ userId }) => {
    return await KeyTokenService.deleteByUserId(userId);
  };
}

export default AccessService;
