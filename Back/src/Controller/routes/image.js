const express = require("express");
const { InsertImage } = require("../InsertImage");
const image = express.Router();

image.post("/insert", InsertImage);

module.exports = image;
