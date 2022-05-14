const app = require('./app');
require('dotenv').config();
const storeModelProducts = require('./models/storeModelProducts');
const storeModelSales = require('./models/storeModelSales');

app.get('/products', async (_req, res) => {
const products = await storeModelProducts.getAllProducts();

res.status(200).json(products);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const products = await storeModelProducts.productsById(id);
  if (!products) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(products);
  });

  app.get('/sales', async (_req, res) => {
    const sales = await storeModelSales.getAllSales();
    
    res.status(200).json(sales);
    });
    
    app.get('/sales/:id', async (req, res) => {
      const { id } = req.params;
      const sales = await storeModelSales.salesById(id);
      if (!sales) {
        return res.status(404).json({ message: 'Sale not found' });
      }
      return res.status(200).json(sales);
      });

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
