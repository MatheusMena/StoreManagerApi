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

module.exports = {
    getAllSales,
    salesById,
};