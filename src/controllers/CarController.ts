import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from './index';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);

      if (!car) {
        return res.status(400).json({ error: 'error' });
      }

      if ('error' in car) {
        return res.status(400).json({ error: 'error' });
      }

      return res.status(201).json(car);
    } catch (error) {
      return res.status(400).json({ error: 'error' });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);
      return car ? res.json(car) : res.status(400);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

export default CarController;
