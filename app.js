const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const products = require('./controllers/productController');
const sales = require('./controllers/salesController');
// const storeModelSales = require('./models/storeModelSales');
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.get('/products', products.getAllProducts);
  
app.get('/products/:id', products.productsById);

app.get('/sales', sales.getAllSales);
    
app.get('/sales/:id', sales.salesById);

module.exports = app;
