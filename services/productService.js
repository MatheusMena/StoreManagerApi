const storeModelProducts = require('../models/storeModelProducts');

const getAll = async () => {
  const products = await storeModelProducts.getAllProducts();

  return products;
};

const findById = async (id) => {
  const productId = await storeModelProducts.productsById(id);

  if (!productId) return null;

  return productId;
};

const create = async (name, quantity) => {
  const verify = await storeModelProducts.verifyName(name);
  console.log(verify[0]);
  if (verify[0].length === 0) {
  const createProduct = await storeModelProducts.productPost(name, quantity);
  return createProduct;
  }
  return false;
};

const update = async (name, quantity, id) => {
  const verify = await storeModelProducts.verifyId(id);
  if (verify[0].length === 0) {
  return false;
  }
  const updateProduct = await storeModelProducts.productUpdate(name, quantity, id);
  return updateProduct;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};
