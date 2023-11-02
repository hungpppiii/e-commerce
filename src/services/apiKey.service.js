"use strict";

import crypto from "crypto";
import apiKeyModel from "../models/apikey.model";
import { Permissions } from "../utils/constantType";

class ApiKeyService {
  static findById = async (key) => {
    const newKey = await apiKeyModel.create({
      key: crypto.randomBytes(64).toString("hex"),
      permissions: [Permissions.ALL],
    });
    const objKey = await apiKeyModel.findOne({ key }).lean();
    return objKey;
  };
}

export default ApiKeyService;
