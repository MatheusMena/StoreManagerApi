const connection = require('./connection');

// Busca todas as pessoas autoras do banco.

const getAllProducts = async () => {
const [products] = await connection.execute(
'SELECT  * FROM products',
);
return products;
};

module.exports = {
    getAllProducts,
};