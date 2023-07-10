const { Router } = require("express");
const Product = require("./productsRoutes");
const Category = require("./categoryRoutes");
const Subcategory = require("./subcategoryRoutes");
const FilterByCategory = require("./filterByCategoryRoutes");
const FilterSubcate = require("./filterSub");
const orderRouter = require("./orderRouter");
const mercadoPago = require("./mercadoPagoRoute.js");
const apiDocs = require("./apiDocRoutes");
const Users = require("./usersRoutes");
const resetPassword = require("./resetPasswordRoutes");
const Facture = require("./factureRoutes");
const Signup = require("./signupRoutes");
// const webhookRouter = require("./webhookRoutes");

const router = Router();

router.use("/", apiDocs);
// router.use("/webhook", webhookRouter);
router.use("/order", orderRouter);
router.use("/products", Product);
router.use("/category", Category);
router.use("/subcategory", Subcategory);
router.use("/filterByCategory", FilterByCategory);
router.use("/filterSub", FilterSubcate);
router.use("/products/facture", Facture);
router.use("/users/signup", Signup);
router.use("/", resetPassword);
router.use("/app", mercadoPago);
//router.use("/review", review);

router.use("/auth", Users);

module.exports = router;
