const { Router } = require("express");
const { signup } = require("../controllers/notificationController");

const router = Router();

router.post("/", signup);

module.exports = router;
