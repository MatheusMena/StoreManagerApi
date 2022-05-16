const productService = require('../services/productService');

const getAllProducts = async (_req, res) => {
  const products = await productService.getAll();

  res.status(200).json(products);
};

const productsById = async (req, res) => {
  const { id } = req.params;
  const products = await productService.findById(id);
  if (!products) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(products);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create(name, quantity);
  if (!newProduct) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  return res.status(201).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await productService.update(name, quantity, id);
  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }
  if (name && quantity) {
    return res.status(200).json({ id, name, quantity });
  }
};
module.exports = {
  getAllProducts,
  productsById,
  create,
  update,
};
