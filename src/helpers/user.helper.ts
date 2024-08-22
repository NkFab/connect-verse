import bcrypt from "bcryptjs";
import { usersRepository } from "../db/sequelize";
import { IUserCreationAttributes } from "../types/user.types";
import config from "config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import generator from "generate-password";

export class UserHelper {
  public hashPassword = (password: string): string => {
    const genSalt = bcrypt.genSaltSync(); // default generate salt (10)

    const hash = bcrypt.hashSync(password, genSalt);

    return hash;
  };

  /**
   *
   * @param password password from request
   * @param hashedPassword  from database
   * @returns boolean
   */
  public comparePassword = (
    password: string,
    hashedPassword: string
  ): boolean => {
    const compare = bcrypt.compareSync(password, hashedPassword);

    return compare;
  };

  /**
   *
   * @param values
   * @returns User
   */
  public registerUser = async (
    values: IUserCreationAttributes
  ): Promise<any> => {
    if (values.password === null || values.password === undefined) {
      const pass = generator.generate({
        length: 11,
        numbers: true,
        excludeSimilarCharacters: true,
        symbols: false
      });

      const create = await usersRepository.create({
        ...values,
        password: this.hashPassword(pass)
      });

      return create;
    }

    const create = await usersRepository.create({
      ...values,
      password: this.hashPassword(values.password)
    });

    return create;
  };

  public generateWebToken = (payload: Record<string, any>): string => {
    const webtoken = jwt.sign(payload, config.get("app.secretKey") as string, {
      expiresIn: 180 * 60
    });

    return webtoken;
  };

  public validateToken = (
    token: string,
    secretKey?: string
  ): string | JwtPayload => {
    const header = jwt.verify(token, secretKey || config.get("app.secretKey"));
    return header;
  };

  public getDefaultPassword = (): string => {
    return this.hashPassword(`${faker.internet.password()}-${Date.now()}`);
  };

  public generateOTP = (length = 4): string => {
    let otp = "";

    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    return otp;
  };
}

export default UserHelper;
