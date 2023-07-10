const { Router } = require("express");
const { resetPasswordHandler } = require("../handlers/resetPasswordHandler");

const router = Router();

router.post("/reset", resetPasswordHandler);

module.exports = router;
