const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
    const products = await salesService.getAll();
    
    res.status(200).json(products);
    };

const salesById = async (req, res) => {
    const { id } = req.params;
    const sales = await salesService.findById(id);
    if (!sales) {
      return res.status(404).json({ message: 'Sale not found' });
      }
    return res.status(200).json(sales);
  };

module.exports = {
    getAllSales,
    salesById,
};