import KeyTokenModel from "../models/keytoken.model";
import { Types } from "mongoose";

class KeyTokenService {
  static upsertKeyToken = async ({ userId, publicKey, refreshToken = [] }) => {
    const publicKeyString = publicKey ? publicKey.toString() : publicKey;

    const filter = { userId };
    const update = { userId, publicKey: publicKeyString, refreshToken };
    const options = { upsert: true, new: true };
    const tokens = await KeyTokenModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    return tokens
      ? {
          publicKeyString: tokens.publicKey,
        }
      : null;
  };

  static findByUserId = async (userId) => {
    return await KeyTokenModel.findOne({
      userId: new Types.ObjectId(userId),
    }).lean();
  };

  static deleteByUserId = async (userId) => {
    return await KeyTokenModel.deleteOne({ userId });
  };
}

export default KeyTokenService;
