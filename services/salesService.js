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

  const create = async (sale) => {
    const saleId = await storeModelSales.saleIdPost();
    console.log('create', saleId);
    await Promise
    .all(sale
    .map(({ productId, quantity }) => storeModelSales
    .salePostProducts(saleId, productId, quantity)));
    return { id: saleId, itemsSold: [...sale] };
  };

  module.exports = {
    getAll,
    findById,
    create,
  };