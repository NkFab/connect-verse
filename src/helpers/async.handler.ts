import { httpStatuses } from "./../constants/httpstatuses";
import * as Sentry from "@sentry/node";
import { Request, Response, NextFunction } from "express";
import jsonResponse from "./response.helper";

const isProduction = process.env.NODE_ENV === "production";

type CallbackFunction = (
  req: Request,
  Res: Response,
  next: NextFunction
) => void | Promise<Response | undefined>;

const asyncHandler = (cb: CallbackFunction) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    await cb(req, res, next);
  } catch (err) {
    if (isProduction) {
      Sentry.captureException(err);
    }

    const status = err.status || httpStatuses.INTERNAL_SERVER_ERROR;

    return jsonResponse({
      res,
      status,
      message:
        err?.errors && err?.errors[0]
          ? err?.errors[0]?.message
          : err.message || err.data.errorMessage
    });
  }
};

export default asyncHandler;
