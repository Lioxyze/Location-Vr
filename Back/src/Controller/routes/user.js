const express = require("express");
const user = express.Router();

const {
  Register,
  Login,
  testEmail,
  // valideAccount,
} = require("../UserController");
const { verifDataRegister } = require("../../middlewares/middlewares");

user.post("/register", verifDataRegister, Register);
user.post("/login", Login);
user.get("/email", testEmail);
// user.patch("/valide/user/:token", valideAccount);

module.exports = user;
