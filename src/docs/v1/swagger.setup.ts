import swaggerJsDoc, { SwaggerDefinition } from "swagger-jsdoc";
import path from "path";
import swaggerUI from "swagger-ui-express";
import config from "config";

const definition: SwaggerDefinition = {
  info: {
    title: "Connectverse",
    description: "API Documentation for Connectverse",
    version: "1.0.0"
  },
  servers: [{ url: config.get("app.baseUri.be") }],
  openapi: "3.0.0"
};

const swaggerOptions = {
  swaggerDefinition: definition,
  apis: ["./docs.yaml"]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerSetup = swaggerUI.setup(swaggerSpec);

export default swaggerSetup;
