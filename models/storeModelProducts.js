const connection = require('./connection');

const getAllProducts = async () => {
const [products] = await connection.execute(
'SELECT  * FROM products',
);
console.log(products);
return products;
};

const productsById = async (id) => {
const query = 'SELECT * FROM products WHERE id = ?';
const [productId] = await connection.execute(query, [id]);
return productId[0];
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

const productUpdate = async (name, quantity, id) => {
    const query = `UPDATE products 
    SET name = ?, quantity = ?
    WHERE id = ?;`;
   await connection.execute(query, [name, quantity, id]);
    return { id, name, quantity };
};

const productDelete = async (id) => {
    const query = 'DELETE FROM products WHERE id = ?';
   await connection.execute(query, [id]);
};

const verifyId = async (id) => {
    const query = 'SELECT id FROM StoreManager.products WHERE id = ?';
    const [product] = await connection.execute(query, [id]);
    return product[0];
    };

const verifyName = async (name) => {
const query = 'SELECT name FROM products WHERE name = ?';
const [product] = await connection.execute(query, [name]);
return product[0];
};

module.exports = {
    getAllProducts,
    productsById,
    productPost,
    verifyName,
    productUpdate,
    verifyId,
    productDelete,
};