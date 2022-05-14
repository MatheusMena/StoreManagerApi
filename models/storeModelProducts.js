const connection = require('./connection');

const getAllProducts = async () => {
const [products] = await connection.execute(
'SELECT  * FROM products',
);
return products;
};

const productsById = async (id) => {
const query = 'SELECT * FROM products WHERE id = ?';
const [productId] = await connection.execute(query, [id]);
const data = productId[0];
if (productId.length === 0) return null;
return data;
};

module.exports = {
    getAllProducts,
    productsById,
};