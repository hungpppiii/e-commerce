import express from "express";
import accessController from "../../controllers/access.controller";
import { authentication } from "../../middlewares/checkAuth";

const router = express.Router();

/**
 * @openapi
 * /shop/signup:
 *  post:
 *    summary: Signup
 *    description: Signup in app!
 *    security:
 *      - keyapi: []
 *      - accessToken: []
 *    requestBody:
 *      require: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      metadata:
 *        type: object
 *      201:
 *        description: Returns a metadata contains tokens.
 */
router.post("/shop/signup", accessController.signUp);
router.post("/shop/signin", accessController.signIn);

// authentication
router.use(authentication);
router.post('/shop/logout', accessController.logout);

export default router;
