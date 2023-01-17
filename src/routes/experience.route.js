const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const { experienceOwner } = require("../middleware/authorization");
const { remove } = require("../controller/experience.controller");

const router = express.Router();

router.delete("/experience/:id", jwtAuth, experienceOwner, remove);

module.exports = router;
