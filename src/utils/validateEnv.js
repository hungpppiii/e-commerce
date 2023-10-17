import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: port({ default: 8000 }),
  NODE_ENV: str({
    choices: ["development", "test", "production", "staging"],
  }),
  DEV_DB_HOST: str({ default: "localhost" }),
  DEV_DB_PORT: port({ default: 27017 }),
  DEV_DB_NAME: str({ default: "eCommerceDev" }),
  PRO_DB_HOST: str({ default: "localhost" }),
  PRO_DB_PORT: port({ default: 27017 }),
  PRO_DB_NAME: str({ default: "eCommercePro" }),
});
