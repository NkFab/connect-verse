import { httpStatuses } from "./../constants";
import { IResponseWrapper } from "../types/shared.types";
import moment from "moment";
import { Response } from "express";

export const responseWrapper = ({
  res,
  status = httpStatuses.OK,
  ...data
}: IResponseWrapper): Response => {
  const response = {
    status,
    ...data,
    timestamp: moment()
      .format("YYYY-MM-DD h:mm:ss a")
      .toUpperCase()
  };
  return res.status(status).json(response);
};

export default responseWrapper;
