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

  module.exports = {
    getAll,
    findById,
  };