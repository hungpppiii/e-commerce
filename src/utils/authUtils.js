"use strict";

import jwt from "jsonwebtoken";

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1 days",
    });

    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    // private key creates accessToken and public key decrypts accessToken
    // Cannot create accessToken from public key and decrypt with public key
    // jwt.verify(accessToken, publicKey, (err, decode) => {
    //   if (err) {
    //     console.log("Error verify: ", err);
    //   } else {
    //     console.log("Decode verify: ", decode);
    //   }
    // });

    return { accessToken, refreshToken };
  } catch (error) {}
};

export { createTokenPair };
