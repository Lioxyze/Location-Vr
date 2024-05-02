const express = require("express");
const user = require("./Controller/routes/user");
const rental = require("./Controller/routes/rentals");
const equipment = require("./Controller/routes/equipment");
const image = require("./Controller/routes/image");

const app = express();
let cors = require("cors");
require("dotenv").config();

app.use(cors());
const PORT = 3000;

app.use(express.json());

app.use("/api", user);
app.use("/api", rental);
app.use("/api", equipment);
app.use("/api", image);

app.listen(PORT);
console.log("Le serveur marche bien sur le port", PORT);
