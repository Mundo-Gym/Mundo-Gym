const { Router } = require("express");

const {
  addSubcategoryHandler,
  getAllSubcategoryHandler,
  deleteSubcategoryHandler,
} = require("../handlers/SubcategoryHandler");

const router = Router();

router.get("/", getAllSubcategoryHandler);
router.post("/", addSubcategoryHandler);
router.delete("/:id", deleteSubcategoryHandler);

module.exports = router;
