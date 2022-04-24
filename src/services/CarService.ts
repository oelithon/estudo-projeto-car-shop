import { Car, carSchema } from '../interfaces/CarInterface';
import GenericService, { ServiceError } from './GenericService';
import CarModel from '../models/CarModel';

class CarService extends GenericService<Car> {
  constructor(public model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError> => {
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  read = async (): Promise<Car[]> => this.model.read();

  readOne = async (id: string): Promise<Car | null | ServiceError> =>
    this.model.readOne(id);

  update = async (id: string, obj: Car): Promise<Car | null | ServiceError> => {
    this.model.update(id, obj);
    return this.model.readOne(id);
  };

  delete = async (id: string): Promise<Car | null | ServiceError> => {
    const carMatch = this.model.readOne(id);
    this.model.delete(id);
    return carMatch;
  };
}

export default CarService;
