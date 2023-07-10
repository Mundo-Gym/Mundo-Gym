const { Router } = require("express");

const {
  filterProductsByCategoryHandler,
} = require("../handlers/filterByCategoryHandler");

const router = Router();

router.get("/", filterProductsByCategoryHandler);

module.exports = router;
