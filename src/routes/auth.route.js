const express = require("express");
const { isVerified } = require("../middleware/authorization");
const validation = require("../validations/auth.validations");
const runValidation = require("../middleware/runValidation");
const {
  register,
  activation,
  login,
  forgot,
  reset,
} = require("../controller/auth.controller");

const router = express.Router();

router
  .post("/auth/register", validation.register, runValidation, register)
  .post("/auth/login", validation.login, runValidation, login)
  .post(
    "/auth/reset/:token",
    isVerified,
    validation.reset,
    runValidation,
    reset
  )
  .get("/auth/activation/:token", activation)
  .post("/auth/forgot", isVerified, validation.forgot, runValidation, forgot);

module.exports = router;
