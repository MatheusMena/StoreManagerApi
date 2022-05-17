const connection = require('./connection');

const getAllSales = async () => {
const query = `SELECT * FROM sales_products,sales WHERE sales_products.sale_id = sales.id
ORDER BY sale_id, product_id`;
const [sales] = await connection.execute(query);
const data = sales.map((item) => (
 {
    saleId: item.sale_id,
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,   
}
));
return data;
};

const salesById = async (id) => {
const query = `SELECT * FROM sales_products,sales WHERE sales_products.sale_id = sales.id
AND sales.id = ?
ORDER BY sale_id, product_id`;
const [saleId] = await connection.execute(query, [id]);
if (saleId.length === 0) return null;
const data = saleId.map((item) => ({
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity, 
}));

return data;
};
const saleIdPost = async () => {
const query = 'INSERT INTO sales(date) values(NOW())'; 
const [sale] = await connection.execute(query);
console.log('saleid', sale.insertId);
return sale.insertId;
};

const salePostProducts = async (saleid, productId, quantity) => {
    const query = 'INSERT INTO sales_products(sale_id,product_id,quantity) values(?,?,?)';
     const product = await connection.execute(query, [saleid, productId, quantity]);
     console.log('saleProduct', product);
    return product;
};

const productUpdate = async (saleId, productId, quantity) => {
    const query = `UPDATE sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?;`; 
     await connection.execute(query, [quantity, saleId, productId]);
};

const verifyId = async (id) => {
    const query = 'SELECT id FROM StoreManager.sales WHERE id = ?';
    const [product] = await connection.execute(query, [id]);
    return product[0];
    };
module.exports = {
    getAllSales,
    salesById,
    salePostProducts,
    saleIdPost,
    productUpdate,
    verifyId,
};