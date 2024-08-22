import { Repository } from "sequelize-typescript";
import { Users } from "../db/models";

export type IRepositoryType = Repository<Users>;
