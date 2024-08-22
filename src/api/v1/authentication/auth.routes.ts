import express, { IRouter } from "express";
import AuthController from "./auth.controller";
import {
  validateLogin,
  validateCreateUser
} from "./auth.validation";

export class AuthRoute extends AuthController {
  private _router = express.Router();

  constructor() {
    super();

    this.createRoutes();
  }

  public get router(): IRouter {
    return this._router;
  }

  private createRoutes = (): void => {
    this._router.post("/login", validateLogin, this.login);
    this._router.post("/logout", this.logout);

    this._router.post(
      "/signup",
      validateCreateUser,
      this.createUser
    );
  };
}

export default AuthRoute;
