import * as dotenv from "dotenv";
dotenv.config();
import * as http from "http";
import { sequelize } from "./db/sequelize";
import app from "./app";

const server = http.createServer(app);

const port = process.env.PORT || 4000;

server.listen(port, async () => {
  try {
    await sequelize.sync({ alter: true, logging: console.log });
  } catch (error) {
    console.log(error);
  }

  console.log(`Server started on PORT ${port}`);
});
