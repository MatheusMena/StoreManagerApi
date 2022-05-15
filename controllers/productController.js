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

module.exports = {
    getAllProducts,
    productsById,
};