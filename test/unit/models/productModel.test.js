const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/storeModelProducts');

  describe('Insere um novo produto no BD', () => {
    const payloadProduct =  { "name": "produto", "quantity": 10 }
  
    before(async () => {
        const execute = [{ insertId: 1 }]; // retorno esperado nesse teste

        sinon.stub(connection, 'execute').resolves(execute);
      });

    after(async () => {
        connection.execute.restore();
      });
      
    describe('quando é inserido com sucesso', () => {
  
      it('retorna um objeto', async () => {
        const response = await ProductsModel.productPost(payloadProduct);
  
        expect(response).to.be.a('object')
      });
  
      it('tal objeto possui o "id" do novo produto inserido', async () => {
        const response = await ProductsModel.productPost(payloadProduct);
  
        expect(response).to.have.a.property('id')
      });
  
    });
  });

  describe('busca todos os produtos no bd', () => {
    describe('Se não tiver nada cadastrado' , () => {
      const resultExecute = [[]]
      before(() => {
        sinon.stub(connection, 'execute').resolves(resultExecute)
      })
      after(() => {
        connection.execute.restore();
      })
     it('retorna um array', async () => {
      const result = await ProductsModel.getAllProducts();
      expect(result).to.be.a('array');
     })
     it('o array esta vazio', async () => {
      const result = await ProductsModel.getAllProducts();
      expect(result).to.be.empty;
    })
    });
    describe('Quando existem produtos cadastrados', async () => {
      const resultExecute = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
      ]
      before(() => {
        sinon.stub(connection, 'execute').resolves([resultExecute])
      })
      after(() => {
        connection.execute.restore();
      })

      it('retorna um array', async () => {
        const result = await ProductsModel.getAllProducts();
      expect(result).to.be.a('array');
      })
      it('o array não esta vazio', async () => {
        const result = await ProductsModel.getAllProducts();
        expect(result).to.be.not.empty;
      })
      it('o array possui objetos', async () => {
        const [result] = await ProductsModel.getAllProducts();
        expect(result).to.be.a('object')
      })
      it('contem o atributo id,name e quantity', async () => {
        const [result] = await ProductsModel.getAllProducts();
        expect(result).to.includes.all.keys('id','name', 'quantity');
      })
    })
  })