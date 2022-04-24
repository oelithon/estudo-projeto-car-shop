import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';

describe("Testes na camada model rota '/cars'", () => {
  let carModel = new CarModel();

  describe("", () => {
    before(() => {
      sinon.stub(carModel, "create").resolves(
        {
          model: "Ferrari Maranello",
          year: 1963,
          color: "red",
          buyValue: 3500000,
          seatsQty: 2,
          doorsQty: 2
        }
      )
    });

    after(() => {
      (carModel.create as sinon.SinonStub).restore();
    });

    it("Na camada model, testa se é criado um novo carro", async () => {
      const newCar = {
        _id: "4edd40c86762e0fb12000003",
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        seatsQty: 2,
        doorsQty: 2
      };

      const car = await carModel.create(newCar);
      expect(car).to.be.an('object');
    })
  });
});
