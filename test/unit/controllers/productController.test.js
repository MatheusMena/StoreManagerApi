const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../../services/productService');
const ProductsController = require('../../../controllers/productController');

// fonte: trybe liveLectures 23.4
describe('chamada do controller getAll', () => { 
    describe('quando existem produtos no bd', () => { 
         const resultExecute = [
            { id: 1, name: 'Martelo de Thor', quantity: 10 },
            { id: 2, name: 'Traje de encolhimento', quantity: 20 },
            { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
          ]
        const response = {};
        const request = {};

        before(() => {
            response.status = sinon.stub()
              .returns(response);
            response.json = sinon.stub()
              .returns();
      
            sinon.stub(ProductsService, 'getAll')
              .resolves([resultExecute]);
          })
      
          after(() => {
            ProductsService.getAll.restore();
          });
      

        it('quando a requisição é feita corretamente é retornado status http 201', async () => { 
         await  ProductsController.getAllProducts(request,response)
         console.log(response)
         expect(response.status.calledWith(200)).to.be.equal(true);
         })
         it('é retornado o metodo JSON contendo um objeto', async () => { 
         await  ProductsController.getAllProducts(request,response)
         expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
        })
     })
 })

describe('Insere um novo produto no BD', () => {
    const response = {};
    const request = {};

    before(() => {
        request.body = {
            "id": 1, "name": "produto", "quantity": 10
        };
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(ProductsService, 'create')
          .resolves(true);
      })
  
      after(() => {
        ProductsService.create.restore();
      });
    describe('quando a requisição é feita corretamente é retornado status http 201', () => {
      it('retorna um objeto', async () => {
        await  ProductsController.create(request,response)
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é retornado o metodo JSON contendo um objeto', async () => {
        await  ProductsController.create(request,response)
        expect(response).to.be.a('object')
      });
  
    });
 });