"use strict";

import crypto from "crypto";
import apiKeyModel from "../models/apikey.model";
import { Permissions } from "../utils/constantType";

class ApiKeyService {
  static findById = async (key) => {
    const objKey = await apiKeyModel.findOne({ key }).lean();
    return objKey;
  };
}

export default ApiKeyService;
