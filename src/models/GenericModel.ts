import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class GenericModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) { }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> => this.model
    .findOne({ _id: id });

  update(id: string, obj: T): Promise<T | null> {
    this.model.updateOne({ _id: id }, { ...obj });
    return this.readOne(id);
  }

  delete(id: string): Promise<T | null> {
    const search = this.readOne(id);
    this.model.deleteOne({ _id: id });
    return search;
  }
}

export default GenericModel;
