"use strict";

import mongoose from "mongoose";
import env from "../utils/validateEnv";
import { countConnect } from "../helpers/check.connect";
import dbConfig from "../configs/config.mongodb";

const {
  db: { host, port, name },
} = dbConfig;
const mongodbURI = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (env.NODE_ENV === "development") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(mongodbURI, { maxPoolSize: 50 })
      .then((_) => {
        countConnect();
        console.log("Connected mongodb success!");
      })
      .catch((err) => console.log("Error connect mongodb!\n", err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
export default instanceMongodb;
