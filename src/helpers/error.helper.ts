import { Request, Response, NextFunction } from "express";
import responseWrapper from "./response.helper";
import { httpStatuses } from "../constants";
// import { logger } from "./logger.helper";
import config from "config";

interface ErrorT extends Error {
  status?: number;
}

export default (
  error: ErrorT,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  if (
    config.get("node_env") === "development" ||
    config.get("node_env") === "test"
  ) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  console.log(error.message);

  const status = error.status || httpStatuses.INTERNAL_SERVER_ERROR;

  return responseWrapper({
    res,
    status,
    message:
      status > httpStatuses.INTERNAL_SERVER_ERROR
        ? "Something Went Wrong"
        : "Internal Server Error"
  });
};
