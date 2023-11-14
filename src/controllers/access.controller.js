"use strict";

import { CREATED, OK } from "../core/success.response";
import { asyncHandler } from "../middlewares/asyncHandler";
import AccessService from "../services/access.service";

class AccessController {
  // [POST] shop/signup {email, password}
  signIn = asyncHandler(async (req, res) => {
    new OK({
      message: "Login successfully!",
      metadata: await AccessService.signIn(req.body),
    }).send(res);
  });

  // [POST] shop/signup {name, password, email}
  signUp = asyncHandler(async (req, res) => {
    new CREATED({
      message: "Registered successfully!",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  });

  // [POST] shop/logout
  logout = asyncHandler(async (req, res) => {
    new OK({
      message: "Logout successfully!",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  });
}

export default new AccessController();
