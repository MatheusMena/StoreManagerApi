const storeModelSales = require('../models/storeModelSales');

const getAll = async () => {
      const sales = await storeModelSales.getAllSales();
    return sales;
    };
  
  const findById = async (id) => {
    const SalesById = await storeModelSales.salesById(id);
  
    if (!SalesById) return null;
  
    return SalesById;
  };

  module.exports = {
    getAll,
    findById,
  };