import Routers from './routes/Router';
import App from './app';

import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';

const server = new App();

const Controller = new CarController();

const CarRouter = new Routers<Car>();
CarRouter.addRoute(Controller);

server.addRouter(CarRouter.router);

export default server;
