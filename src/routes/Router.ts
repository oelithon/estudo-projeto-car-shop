import { Router } from 'express';
import Controller from '../controllers';

class Routers<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);
  }
}

export default Routers;
