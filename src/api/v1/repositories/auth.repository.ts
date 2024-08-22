import { IUserCreationAttributes } from "./../../../types/user.types";
/* eslint-disable require-jsdoc */
import { Request, Response, NextFunction } from "express";
import { usersRepository } from "../../../db/sequelize";
import { Users } from "../../../db/models";
import { BaseRepository } from "./base.repository";
import { responseWrapper } from "../../../helpers/response.helper";
import { httpStatuses } from "../../../constants";
import UserHelper from "../../../helpers/user.helper";
import asyncHandler from "../../../helpers/async.handler";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export class AuthRepository extends BaseRepository<Users> {
  private userHelper: UserHelper;

  constructor() {
    super(usersRepository);

    this.userHelper = new UserHelper();
  }

  public createUser = asyncHandler(async (req: any, res: Response) => {
    const {
      email,
      password,
      username
    }: IUserCreationAttributes = req.body;

    const where = {
      email,
      username,
    };
    const found = await this.getRecordByField(where);

    if (found) {
      return responseWrapper({
        res,
        status: httpStatuses.BAD_REQUEST,
        message: "User already exists"
      });
    }

    const created = await this.userHelper.registerUser({
      email,
      password,
      username
    });

    if (!created) {
      return responseWrapper({
        res,
        status: httpStatuses.BAD_REQUEST,
        message: "missing some parameters"
      });
    }

    return responseWrapper({
      status: httpStatuses.OK,
      res,
      message: "User created successfully",
      data: created
    });
  });

  public login = asyncHandler(async (req: Request, res: Response) => {
    // Find user by email
    const find = await this.getRecordByField({
      email: req.body.email
    });

    if (!find) {
      return responseWrapper({
        res,
        status: httpStatuses.BAD_REQUEST,
        message: "wrong credentials"
      });
    }

    // Compare password
    const comparePassword = this.userHelper.comparePassword(
      req.body.password.trim(),
      find.getDataValue("password")
    );

    if (!comparePassword) {
      return responseWrapper({
        res,
        status: httpStatuses.BAD_REQUEST,
        message: "wrong credentials"
      });
    }

    if (comparePassword) {
      const token = await this.userHelper.generateWebToken({
        ...find.toJSON()
      });

      return responseWrapper({
        status: httpStatuses.OK,
        res,
        message: "Logged in successfully",
        token
      });
    }
  });

  public logout = asyncHandler(async (req: Request, res: Response) => {
    await req.session.destroy(err => {
      if (err) {
        throw err;
      }
    });

    return responseWrapper({
      res,
      status: httpStatuses.OK,
      message: "logged out successfully"
    });
  });
}

export default AuthRepository;
