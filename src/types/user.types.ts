import { Optional } from "sequelize";

export interface IUserAttributes {
  user_id: string;
  email: string;
  password?: string;
  username: string;
}

export type IUserCreationAttributes = Optional<IUserAttributes, "user_id">;
