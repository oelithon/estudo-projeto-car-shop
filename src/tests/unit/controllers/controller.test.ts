import mongoose from 'mongoose';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';

const app = server.startServer();

const carController = new CarController();
const carService = new CarService();

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe("Testes na camada controller rota '/cars'", () => {

  describe("", () => {
    before(async () => {
      sinon
        .stub(mongoose.Model, "create")
        .resolves({
          model: "Ferrari Maranello",
          year: 1963,
          color: "red",
          buyValue: 3500000,
          seatsQty: 2,
          doorsQty: 2
        });
    });

    after(() => {
      (mongoose.Model.create as sinon.SinonStub).restore();
    });

    it('Na camada controller, testa se é criado um novo carro', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .post('/cars').send({
          _id: "4edd40c86762e0fb12000003",
          model: "Ferrari Maranello",
          year: 1963,
          color: "red",
          buyValue: 3500000,
          seatsQty: 2,
          doorsQty: 2
        });

      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  });
});
