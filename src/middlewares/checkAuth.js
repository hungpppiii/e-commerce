"use strict";

import ApiKeyService from "../services/apiKey.service";
import { HEADER } from "../utils/constantType";
const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error.",
      });
    }

    // check objKey
    const objKey = await ApiKeyService.findById(key);

    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error.",
      });
    }

    req.objKey = objKey;
    next();
  } catch (error) {}
};

const permission = (permission) => async (req, res, next) => {
  if (!req.objKey.permissions) {
    return res.status(403).json({
      message: "permission denied",
    });
  }

  if (!req.objKey.permissions.includes(permission)) {
    return res.status(403).json({
      message: "permission denied",
    });
  }

  return next();
};

export { apiKey, permission };
