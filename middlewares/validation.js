function validateName(req, res, next) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    } 
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    } 
    next();
    }
    
function validateQuant(req, res, next) {
    const { quantity } = req.body;
    if (quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    } 
    if (!quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    } 
    next();
}

function validateQuantSale(req, res, next) {
  const quant = req.body;
  if (quant.find(({ quantity }) => quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  } 
  if (quant.find(({ quantity }) => !quantity)) {
    return res.status(400).json({ message: '"quantity" is required' });
  } 
  next();
}

function validateId(req, res, next) {
  const id = req.body;
  if (id.find(({ productId }) => !productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  } 

  next();
}

module.exports = {
    validateName,
    validateQuant,
    validateId,
    validateQuantSale,
};