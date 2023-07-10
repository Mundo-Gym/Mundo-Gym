const express = require("express");
const router = express.Router();
const {
  createOrder,
  successOrder,
  // notificarOrder,
   webhookOrder,
} = require("../controllers/mpController");

router.post("/create-order", createOrder);
router.post("/success", successOrder);
router.post("/webhook", webhookOrder);

module.exports = router;
