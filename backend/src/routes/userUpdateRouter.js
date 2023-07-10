const { Router } = require("express");
const router = Router();
const { updateUserHandler } = require("../handlers/updateUserHandler");

router.put("/:email", updateUserHandler);

module.exports = router;
