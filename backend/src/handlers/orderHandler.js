const { getAlphabetic, getPrice } = require("../controllers/OrderController");

//Handler por orden alfabetico recibe un value

const getOrderAlphabetic = async (req, res) => {
  try {
    const { value } = req.params;
    const order = await getAlphabetic(value);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Handler por orden de precio, recibe un value

const getOrderPrice = async (req, res) => {
  try {
    const { value } = req.params;
    const order = await getPrice(value);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOrderPrice,
  getOrderAlphabetic,
};
