const express = require("express");
const router = require("./Controller/routes/user");
const rental = require("./Controller/routes/rental");
const app = express();
let cors = require("cors");
require("dotenv").config();
app.use(cors());
const PORT = 3000;

app.use(express.json());

app.use("/api", router);
app.use("/api", rental);

app.listen(PORT);
console.log("Le serveur marche bien sur le port", PORT);
