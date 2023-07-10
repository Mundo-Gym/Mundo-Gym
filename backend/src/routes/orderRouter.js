const { Router } = require("express");

const orderRouter = Router();
const {
  getOrderPrice,
  getOrderAlphabetic,
} = require("../handlers/orderHandler");

// Depnde del value "AZ" O "ZA" ordena alfabeticamente un array de nombres de producto
orderRouter.get("/alphabetic/:value", getOrderAlphabetic);

//Obtiene los productos en orden de precio y depende del value mayor menor --> "Mm"  / menor-mayor --> "mM"
orderRouter.get("/price/:value", getOrderPrice);

module.exports = orderRouter;
