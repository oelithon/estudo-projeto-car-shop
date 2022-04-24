import { expect } from 'chai';
import mongoose, { Types } from 'mongoose';
import CarService from '../../../services/CarService';
import sinon from 'sinon';

describe("Testes no CarModel", () => {
  let carService = new CarService();

  before(() => {
    sinon.stub(carService.model, 'create').resolves(
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
    (carService.create as sinon.SinonStub).restore();
  });

  it('Testa se é criado um novo carro com sucesso', async () => {
    const car = await carService.create;
    expect(car).to.be.an('object');
  });
});
