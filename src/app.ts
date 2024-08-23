import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { errors } from "celebrate";
import { httpStatuses } from "./constants";
import responseWrapper from "./helpers/response.helper";
import swaggerSetup from "./docs/v1/swagger.setup";
import errorHandler from "./helpers/error.helper";
import session from "cookie-session";
import config from "config";
import { MainRoutes } from "./routes";

const app = express();

const mainRoutes = new MainRoutes().router;

app.use(morgan("dev"));

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: config.get("app.session.name"),
    keys: config.get("app.secretKey"),
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.use("/api/v1", mainRoutes);

app.use("/api/v1/docs", swaggerUI.serve, swaggerSetup);

app.use((_req, res) =>
  responseWrapper({
    status: httpStatuses.NOT_FOUND,
    message: "/ Route Not Found",
    res
  })
);

app.use(errors());

app.use(errorHandler);

export default app;
