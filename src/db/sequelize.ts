import { Sequelize } from "sequelize-typescript";
import config from "config";
import { Users } from "./models";

const dbUri: string = config.get("app.database.uri");

export const connect = (url: string): Sequelize => {
  const sequelize = new Sequelize(url, {
    models: [Users],
    repositoryMode: true,
    logging: console.log,
    dialect: "postgres"
  });

  return sequelize;
};

export const sequelize = connect(dbUri);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.log("Unable to connect to the database:", error);
}

export const usersRepository = sequelize.getRepository(Users);
