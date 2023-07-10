const { Router } = require("express");

const { filterSubCategory } = require("../handlers/FilterBySubcate");

const router = Router();

router.get("/", filterSubCategory);

module.exports = router;
