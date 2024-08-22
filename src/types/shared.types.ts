import { usersRepository } from "../db/sequelize";
import { Response } from "express";
import { WhereOptions, FindOptions } from "sequelize";

export interface IMeta {
  total?: number;
  pages?: number;
}

export interface IResponseWrapper {
  res: Response;
  status?: number;
  data?: any;
  token?: string;
  message?: string;
  errorCode?: string;
  errors?: any;
  meta?: {
    total?: number;
    page?: number;
    pages?: number;
    user?: typeof usersRepository;
  };
  [key: string]: any;
}

export interface IPaginationArgs {
  limit?: number;
  page?: number;
  filter?: FindOptions;
  fetchAll?: boolean;
}

export interface IGetPaginationResponse extends IMeta, IPaginationArgs {
  offset: number;
}

export interface IFindModelOptions<Model> extends FindOptions {
  where?: WhereOptions<Model>;
}

export interface IKeyValuePair {
  [key: string]: string | number | any;
}
