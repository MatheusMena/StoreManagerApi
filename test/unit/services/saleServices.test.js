const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/storeModelSales');
const salesService = require('../../../services/salesService');

describe('busca todos os produtos no bd', () => {
    describe('Se não tiver nada cadastrado' , () => {
      const resultExecute = []
      beforeEach(() => {
        sinon.stub(salesModel, 'getAllSales').resolves(resultExecute)
      })
      afterEach(() => {
        salesModel.getAllSales.restore();
      })
     it('retorna um array', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.a('array');
     })
     it('o array esta vazio', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.empty;
    })
    });
    describe('Quando existem vendas cadastrados', () => {
      const resultExecute = [
        { id: 1,  date: '2022-05-18 20:24:50'},
        { id: 2,  date: '2022-05-18 20:24:50'},
      ]
      beforeEach(() => {
        sinon.stub(salesModel, 'getAllSales').resolves([resultExecute])
      })
      afterEach(() => {
        salesModel.getAllSales.restore();
      })

      it('retorna um array', async () => {
        const result = await salesService.getAll();
      expect(result).to.be.a('array');
      })
      it('o array não esta vazio', async () => {
        const result = await salesService.getAll();
        expect(result).to.be.not.empty;
      })
      it('o array possui objetos', async () => {
        const [result] = await salesService.getAll();
        expect(result[0]).to.be.a('object')
      })
      it('contem o atributo date', async () => {
        const [result] = await salesService.getAll();
        expect(result[0]).to.includes.all.keys('date');
      })
    })
  })

describe('Insere um novo produto no BD', () => {
    const payloadProduct =  { "name": "produto", "quantity": 10 }
  
    beforeEach(async () => {
        const execute = [ { "id": 1, "name": "produto", "quantity": 10 }]; // retorno esperado nesse teste

        sinon.stub(salesModel, 'saleIdPost').resolves(execute);
      });

    afterEach(async () => {
        salesModel.saleIdPost.restore();
      });
      
    describe('quando é inserido com sucesso', () => {
  
      it('retorna um objeto', async () => {
        const response = await salesModel.saleIdPost(payloadProduct);
  
        expect(response[0]).to.be.a('object')
      });
  
      it('tal objeto possui o "id" do novo produto inserido', async () => {
        const response = await salesModel.saleIdPost(payloadProduct);
  
        expect(response[0]).to.have.a.property('id')
      });
  
    });
 });