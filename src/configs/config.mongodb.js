import env from "../utils/validateEnv.js"

const dev = {
    db: {
        host: env.DEV_DB_HOST,
        port: env.DEV_DB_PORT,
        name: env.DEV_DB_NAME
    }
}

const pro = {
    db: {
        host: env.PRO_DB_HOST,
        port: env.PRO_DB_PORT,
        name: env.PRO_DB_NAME
    }
}

const dbConfigs = {
    dev, pro
};

const nodeEnv = env.NODE_ENV === 'production' ? 'pro' : 'dev';

export default dbConfigs[nodeEnv];