const { Router } = require("express");
const router = Router();
const { webhookNotification } = require("../handlers/productsHandler")

router.post("/", webhookNotification);

module.exports = router;