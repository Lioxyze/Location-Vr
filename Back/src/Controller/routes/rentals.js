const express = require("express");
const rental = express.Router();

const {
  creatRental,
  allRental,
  deleteRental,
  updateRental,
} = require("../RentalController.js");

rental.post("/creatRental", creatRental);
rental.get("/allRental", allRental);
rental.delete("/deleteRental/:id", deleteRental);
rental.patch("/updateRental/:id", updateRental);

module.exports = rental;
