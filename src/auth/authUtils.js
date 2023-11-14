"use strict";

import jwt from "jsonwebtoken";
import fs from "fs";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";

const __dirname = resolve(dirname(fileURLToPath(import.meta.url)));
const keysDirectory = resolve(__dirname, "..", "..", "keys");
const privateKeyFilePath = resolve(keysDirectory, "private_key.pem");
const publicKeyFilePath = resolve(keysDirectory, "public_key.pem");

const createTokenPair = async (payload, publicKey, privateKey) => {
  // accessToken
  const accessToken = await jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1 days",
  });

  // refreshToken
  const refreshToken = await jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "7 days",
  });

  // private key creates accessToken and public key decrypts accessToken
  // Cannot create accessToken from public key and decrypt with public key
  jwt.verify(accessToken, publicKey, (err, decode) => {
    if (err) {
      console.log("Error verify: ", err);
    } else {
      console.log("Decode verify: ", decode);
    }
  });

  return { accessToken, refreshToken };
};

const getPrivateKey = () => {
  return fs.readFileSync(privateKeyFilePath, "utf8");
};

const getPublicKey = () => {
  return fs.readFileSync(publicKeyFilePath, "utf8");
};

export { createTokenPair, getPrivateKey, getPublicKey };
