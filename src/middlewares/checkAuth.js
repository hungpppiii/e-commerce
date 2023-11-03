"use strict";

import jwt from "jsonwebtoken";
import {
  AuthFailureError,
  BadRequestError,
  NotFoundError,
} from "../core/error.response";
import ApiKeyService from "../services/apiKey.service";
import KeyTokenService from "../services/keyToken.service";
import { HEADER } from "../utils/constantType";
import { asyncHandler } from "./asyncHandler";
const apiKey = asyncHandler(async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY];

  if (!key) {
    throw new BadRequestError("Forbidden Error.");
  }

  // check objKey
  const objKey = await ApiKeyService.findById(key);

  if (!objKey) {
    throw new BadRequestError("Forbidden Error.");
  }

  req.objKey = objKey;
  next();
});

const permission = (permission) =>
  asyncHandler(async (req, res, next) => {
    if (!req.objKey.permissions) {
      throw new BadRequestError("Permission Denied!");
    }

    if (!req.objKey.permissions.includes(permission)) {
      throw new BadRequestError("Permission Denied!");
    }

    return next();
  });

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) {
    throw new AuthFailureError("Invalid request!");
  }

  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) {
    throw new NotFoundError("Not found keyStore!");
  }

  const bearerToken = req.headers[HEADER.AUTHORIZATION];
  const accessToken = bearerToken.replace("Bearer ", "");
  if (!accessToken) {
    throw new AuthFailureError("Invalid request!");
  }

  const decodeUser = jwt.verify(accessToken, keyStore.publicKey);
  if (userId !== decodeUser.userId) {
    throw new AuthFailureError("Invalid userId!");
  }

  req.keyStore = keyStore;

  next();
});

export { apiKey, permission, authentication };
