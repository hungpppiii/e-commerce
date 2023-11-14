import crypto from 'crypto';
import fs from 'fs';
import { dirname } from 'path'; 
import { fileURLToPath } from 'url'; 

const __dirname = dirname(fileURLToPath(import.meta.url));

export const genKeyPair = () => {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1" 
      format: 'pem' // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem' // Most common formatting choice
    }
  });

  return keyPair;
}

const createKeyPairFile = ({privateKey, publicKey}) => {
    // Create the public key file
    fs.writeFileSync(__dirname + '/public_key.pem', publicKey);

    // Create the private key file
    fs.writeFileSync(__dirname + '/private_key.pem', privateKey);
}

const keyPair = genKeyPair();
createKeyPairFile(keyPair)