"use strict";

import { asyncHandler } from "../middlewares/asyncHandler";
import AccessService from "../services/access.service";

class AccessController {
  
  // [POST] shop/signup {name, password, email}
  signUp = asyncHandler(async (req, res) => {
    res.status(201).json(await AccessService.signUp(req.body));
  });
}

export default new AccessController();
