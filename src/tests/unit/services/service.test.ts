import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';

describe("Testes na camada service rota '/cars'", () => {
  let carModel = new CarModel();

  describe("testa o metodo create de CarService", () => {
    before(() => sinon.stub(carModel, 'create').resolves(
      {
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        seatsQty: 2,
        doorsQty: 2
      }
    ));

    after(() => {
      (carModel.create as sinon.SinonStub).restore();
    });

    const carService = new CarService(carModel);

    it('Na camada service, testa se é criado um novo carro', async () => {
      const newCar = {
        _id: "4edd40c86762e0fb12000003",
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        seatsQty: 2,
        doorsQty: 2
      }

      const car = await carService.create(newCar);
      expect(car).to.be.an('object');
    });
  });
});
