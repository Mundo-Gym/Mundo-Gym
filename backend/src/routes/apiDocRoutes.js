"use strict";
const { Router } = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const router = Router();

const swaggerOptions = require("../../swagger.json")

const swaggerDocs = swaggerJsDoc(swaggerOptions)

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocs));

module.exports = router;