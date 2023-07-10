const { Router } = require("express");
const { facture } = require("../controllers/notificationController");

const router = Router();

router.post("/", facture);

module.exports = router;
