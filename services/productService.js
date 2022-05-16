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
  if (verify === undefined) {
   const createProduct = await storeModelProducts.productPost(name, quantity);
  return createProduct;
  }
  return null;
};

const update = async (name, quantity, id) => {
  const verify = await storeModelProducts.verifyId(id);
  if (!verify) {
  return null;
  }
  const updateProduct = await storeModelProducts.productUpdate(name, quantity, id);
  return updateProduct;
};

const deleteId = async (id) => {
  const verify = await storeModelProducts.verifyId(id);
  console.log(verify);
  if (!verify) {
  return null;
  }
  return storeModelProducts.productDelete(id);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteId,
};
