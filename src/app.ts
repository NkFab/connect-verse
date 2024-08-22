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
import expressSession from "express-session";
import config from "config";
import { MainRoutes } from "./routes";

const app = express();

const mainRoutes = new MainRoutes().router;

app.use(morgan("dev"));

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: config.get("app.secretKey"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 5 * 365,
      httpOnly: true,
      secure: config.get("node_env") === "production",
      sameSite: "lax"
    },
    name: config.get("app.session.name")
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
