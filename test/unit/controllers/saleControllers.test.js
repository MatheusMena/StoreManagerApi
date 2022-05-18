const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

// fonte: trybe liveLectures 23.4
describe('chamada do controller getAllSales', () => { 
    describe('quando existem produtos no bd', () => { 
         const resultExecute = [
            { id: 1,  date: '2022-05-18 20:24:50'},
            { id: 2,  date: '2022-05-18 20:24:50'},
          ]
        const response = {};
        const request = {};

        beforeEach(() => {
            response.status = sinon.stub()
              .returns(response);
            response.json = sinon.stub()
              .returns();
      
            sinon.stub(salesService, 'getAll')
              .resolves([resultExecute]);
          })
      
          afterEach(() => {
            salesService.getAll.restore();
          });
      

        it('quando a requisição é feita corretamente é retornado status http 201', async () => { 
         await  salesController.getAllSales(request,response)
         expect(response.status.calledWith(200)).to.be.equal(true);
         })
         it('é retornado o metodo JSON contendo um objeto', async () => { 
         await  salesController.getAllSales(request,response)
         expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
        })
     })
 })

describe('Insere um novo produto no BD sales', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
        request.body =  [
            {
              "productId": 1,
              "quantity": 3
            }
          ]
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(salesService, 'create')
          .resolves(true);
      })
  
      afterEach(() => {
        salesService.create.restore();
      });
    describe('quando a requisição é feita corretamente é retornado status http 201', () => {
      it('retorna um objeto', async () => {
        await  salesController.create(request,response)
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é retornado o metodo JSON contendo um objeto', async () => {
        await  salesController.create(request,response)
        expect(response).to.be.a('object')
      });
  
    });
 });