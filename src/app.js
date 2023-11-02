"use strict";

import "dotenv/config";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { definition } from "./configs/config.swaggerOptions";

const app = express();

// init middlewares
app.use(morgan("dev")); //logging
app.use(helmet()); // security - block curl --include...
app.use(compression()); //

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// init db
import "./dbs/init.mongodb";
// import { checkOverload } from "./helpers/check.connect.js";

// checkOverload();

// setting swagger
const swaggerOptions = {
  definition,
  apis: ["./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// init routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/v1/api", router);

// errors handler

export default app;
