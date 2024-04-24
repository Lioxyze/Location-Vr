const express = require("express");
const rental = express.Router();

const { CreateRental } = require("../RentalController");

rental.get("/CreateRental", CreateRental);

module.exports = rental;
