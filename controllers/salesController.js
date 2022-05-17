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

const create = async (req, res) => {
    const sale = req.body;
    const sales = await salesService.create(sale);
    return res.status(201).json(sales);
 };

const update = async (req, res) => {
  const { id } = req.params;
  const item = req.body;
  const updatedProduct = await salesService.update(id, item);
  return res.status(200).json(updatedProduct);
};

module.exports = {
    getAllSales,
    salesById,
    create,
    update,
};