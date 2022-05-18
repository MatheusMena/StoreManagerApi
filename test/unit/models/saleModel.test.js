const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/storeModelSales');

  describe('Insere um novo produto no BD sales', () => {
    const payloadProduct =  { "name": "produto", "quantity": 10 }
  
    beforeEach(async () => {
        const execute = { insertId: 1 }; // retorno esperado nesse teste

        sinon.stub(connection, 'execute').resolves([execute]);
      });

    afterEach(async () => {
        connection.execute.restore();
      });
      
    describe('quando é inserido com sucesso', () => {
  
      it('retorna um objeto', async () => {
        const response = await salesModel.salePostProducts(payloadProduct);
  
        expect(response[0]).to.be.a('object')
      });
      it('O array não pode estar vazio', async () => {
        const response = await salesModel.salePostProducts(payloadProduct);
  
        expect(response).to.be.not.empty;
      });
    });
  });

  describe('busca todos os produtos no bd', () => {
    describe('Se não tiver nada cadastrado' , () => {
      const resultExecute = [[]]
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(resultExecute)
      })
      afterEach(() => {
        connection.execute.restore();
      })
     it('retorna um array', async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.be.a('array');
     })
     it('o array esta vazio', async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.be.empty;
    })
    });
    describe('Quando existem produtos cadastrados', async () => {
      const resultExecute = [
        { id: 1,  date: NOW()},
        { id: 2,  date: NOW()},
      ]
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves([resultExecute])
      })
      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array', async () => {
        const result = await salesModel.getAllSales();
      expect(result).to.be.a('array');
      })
      it('o array não esta vazio', async () => {
        const result = await salesModel.getAllSales();
        expect(result).to.be.not.empty;
      })
      it('o array possui objetos', async () => {
        const [result] = await salesModel.getAllSales();
        expect(result).to.be.a('object')
      })
      it('contem o atributo id,name e quantity', async () => {
        const [result] = await salesModel.getAllSales();
        expect(result).to.includes.all.keys('id','quantity');
      })
    })
  })