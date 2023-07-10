const { Router } = require("express");

const {
  deleteProductsHandler,
  createProductsHandler,
  getProductsHandler,
  getProductIdHandler,
  disableProductsHandler,
} = require("../handlers/productsHandler");
const { newReview } = require("../controllers/reviewController");
const router = Router();

router.get("/", getProductsHandler);
router.get("/:id", getProductIdHandler);
router.post("/", createProductsHandler);
router.delete("/:id", deleteProductsHandler);
router.put("/disableProduct", disableProductsHandler);
router.post("/:id/review", newReview);

module.exports = router;
