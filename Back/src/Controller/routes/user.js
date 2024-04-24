const express = require("express");
const router = express.Router();

const { Register, Login } = require("../UserController");
const { verifDataRegister } = require("../../middlewares/middlewares");

router.post("/register", verifDataRegister, Register);
router.post("/login", Login);

module.exports = router;
