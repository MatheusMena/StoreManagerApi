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

const productPost = async (name, quantity) => {
    const query = 'INSERT INTO products (name, quantity) values(?,?);';
    const [product] = await connection.execute(query, [name, quantity]);
    const productRegistered = {
    id: product.insertId,
    name,
    quantity,
    };
    return productRegistered;
};

const verifyName = async (name) => {
const query = 'SELECT name FROM StoreManager.products WHERE name = ?';
const product = await connection.execute(query, [name]);
return product;
};

module.exports = {
    getAllProducts,
    productsById,
    productPost,
    verifyName,
};