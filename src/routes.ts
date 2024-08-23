import express from "express";
import { Router } from "express";
import { AuthRoute } from "./api/v1/authentication/auth.routes";
export class MainRoutes {
  private _router = express.Router();

  private readonly authRoute: AuthRoute;

  constructor() {
    this.authRoute = new AuthRoute();

    this.routes();
  }

  public get router(): Router {
    return this._router;
  }

  private routes(): void {
    this._router.use("/auth", this.authRoute.router);
  }
}
