const express = require("express");
const rental = express.Router();

const { createrental } = require("../RentalController");

rental.post("/createrental", createrental);

module.exports = rental;
