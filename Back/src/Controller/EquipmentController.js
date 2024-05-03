const { pool } = require("../connexions/ConnexionSql");
let cors = require("cors");

const creatEquipment = async (req, res) => {
  try {
    const Image = req.body.Image;
    const EquipmentName = req.body.EquipmentName;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Quantity = req.body.Quantity;
    const [rows] = await pool.query(
      `INSERT INTO equipment (EquipmentName,Image,Description,Price,Quantity) VALUES (?,?,?,?,?)`,
      [EquipmentName, Image, Description, Price, Quantity]
    );

    console.log(rows);
    res.json({ success: rows.affectedRows > 0 });
  } catch (error) {
    console.log(error.stack);
  }
};

const allEquipment = async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM equipment WHERE 1`);

    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ID de l'équipement à supprimer :", id);

    const [result] = await pool.execute(
      "DELETE FROM equipment WHERE EquipmentID = ?",
      [id]
    );
    res.json({ message: "L'équipement a été supprimée avec succès." });
    console.log("Résultat de la suppression :", result);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateEquipement = async (req, res) => {
  try {
    const { EquipmentID, Image, EquipmentName, Description, Price, Quantity } =
      req.body;

    if (
      !EquipmentID ||
      !Image ||
      !EquipmentName ||
      !Description ||
      !Price ||
      !Quantity
    ) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const sql = `UPDATE equipment 
                 SET Image = ?, EquipmentName = ?, Description = ?, Price = ?, Quantity = ? 
                 WHERE EquipmentID = ?`;

    const values = [
      Image,
      EquipmentName,
      Description,
      Price,
      Quantity,
      EquipmentID,
    ];

    const [result] = await pool.execute(sql, values);

    res.status(200).json(result);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  updateEquipement,
  creatEquipment,
  allEquipment,
  deleteEquipment,
};
