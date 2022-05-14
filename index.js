const app = require('./app');
require('dotenv').config();
const storeModel = require('./models/storeModelProducts');

app.get('/products', async (_req, res) => {
const products = await storeModel.getAllProducts();

res.status(200).json(products);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const products = await storeModel.productsById(id);
  if (!products) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(products);
  });

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
