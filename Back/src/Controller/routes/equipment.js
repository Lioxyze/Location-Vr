const express = require("express");
const equipment = express.Router();

const {
  allEquipment,
  deleteEquipment,
  creatEquipment,
  updateEquipement,
} = require("../EquipmentController");

equipment.post("/creatEquipment", creatEquipment);
equipment.get("/allEquipment", allEquipment);
equipment.patch("/updateEquipement/:id", updateEquipement);
equipment.delete("/equipementDelete/:id", deleteEquipment);

module.exports = equipment;
