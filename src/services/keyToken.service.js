import KeyTokenModel from "../models/keytoken.model";

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString();
            console.log(publicKeyString);
            const filter = {userId};
            const update = {userId, publicKey: publicKeyString};
            const options = {upsert: true, new: true};
            const tokens = await KeyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }
}

export default KeyTokenService;