import { Model, WhereOptions, FindOptions } from "sequelize";
import { Repository } from "sequelize-typescript";

export class BaseRepository<M extends Model> {
  private _model: Repository<M>;

  constructor(model: Repository<M>) {
    this._model = model;
  }

  protected createRecord = async (options: M[any]): Promise<any> => {
    return await this._model.create(options);
  };

  protected getRecordByField = async (
    where: WhereOptions<M>,
    option?: FindOptions
  ): Promise<any> => {
    return await this._model.findOne({ where, ...option });
  };
}

export default BaseRepository;
