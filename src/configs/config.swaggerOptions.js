import { HEADER } from "../utils/constantType";

export const definition = {
    openapi: "3.0.0",
    info: {
      title: "ECommerce API",
      version: "1.0.0",
      description: "",
    },
    servers: [
      {
        url: "/v1/api",
      },
    ],
    components: {
      securitySchemes: {
        keyapi: {
          type: 'apiKey',
          name: HEADER.API_KEY,
          in: 'header',
        },
        accessToken: {
          type: 'http',
          scheme: 'bearer',
          in: 'header'
        },
      },
    },
  }