const sinon = require('sinon');
const { expect } = require('chai');
const ProductsModel = require('../../../models/storeModelProducts');
const ProductsService = require('../../../services/productService');

describe('busca todos os produtos no bd', () => {
    describe('Se não tiver nada cadastrado' , () => {
      const resultExecute = []
      beforeEach(() => {
        sinon.stub(ProductsModel, 'getAllProducts').resolves(resultExecute)
      })
      afterEach(() => {
        ProductsModel.getAllProducts.restore();
      })
     it('retorna um array', async () => {
      const result = await ProductsService.getAll();
      expect(result).to.be.a('array');
     })
     it('o array esta vazio', async () => {
      const result = await ProductsService.getAll();
      expect(result).to.be.empty;
    })
    });
    describe('Quando existem produtos cadastrados',  () => {
      const resultExecute = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
      ]
      beforeEach(() => {
        sinon.stub(ProductsModel, 'getAllProducts').resolves([resultExecute])
      })
      afterEach(() => {
        ProductsModel.getAllProducts.restore();
      })

      it('retorna um array', async () => {
        const result = await ProductsService.getAll();
      expect(result).to.be.a('array');
      })
      it('o array não esta vazio', async () => {
        const result = await ProductsService.getAll();
        expect(result).to.be.not.empty;
      })
      it('o array possui objetos', async () => {
        const [result] = await ProductsService.getAll();
        expect(result[0]).to.be.a('object')
      })
      it('contem o atributo id,name e quantity', async () => {
        const [result] = await ProductsService.getAll();
        expect(result[0]).to.includes.all.keys('id','name', 'quantity');
      })
    })
  })

describe('Insere um novo produto no BD', () => {
    const payloadProduct =  { "name": "produto", "quantity": 10 }
  
    beforeEach(async () => {
        const execute = [ { "id": 1, "name": "produto", "quantity": 10 }]; // retorno esperado nesse teste

        sinon.stub(ProductsModel, 'productPost').resolves(execute);
      });

    afterEach(async () => {
      ProductsModel.productPost.restore();
      });
      
    describe('quando é inserido com sucesso', () => {
  
      it('retorna um objeto', async () => {
        const response = await ProductsModel.productPost(payloadProduct);
  
        expect(response[0]).to.be.a('object')
      });
  
      it('tal objeto possui o "id" do novo produto inserido', async () => {
        const response = await ProductsModel.productPost(payloadProduct);
  
        expect(response[0]).to.have.a.property('id')
      });
  
    });
 });