const { pool } = require("../connexions/ConnexionSql");
let cors = require("cors");
const { ObjectId } = require("bson");

const creatRental = async (req, res) => {
  try {
    const {
      Image,
      NameRental,
      DescriptionRental,
      RentalStartDate,
      RentalEndDate,
      TotalRentalAmount,
    } = req.body;

    if (!NameRental) {
      return res
        .status(400)
        .json({ error: "Le champ 'NameRental' est obligatoire." });
    }

    const [rows] = await pool.query(
      `INSERT INTO rental (Image,NameRental, DescriptionRental, RentalStartDate, RentalEndDate, TotalRentalAmount) VALUES (?,?, ?, ?, ?, ?)`,
      [
        Image,
        NameRental,
        DescriptionRental,
        RentalStartDate,
        RentalEndDate,
        TotalRentalAmount,
      ]
    );

    console.log(rows);
    res.json({ success: rows.affectedRows > 0 });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de la location.",
    });
  }
};

const allRental = async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM rental WHERE 1`);

    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const deleteRental = async (req, res) => {
  try {
    const RentalID = req.params.RentalID;
    console.log("ID de l'équipement à supprimer :", RentalID);

    const [result] = await pool.execute(
      "DELETE FROM rental WHERE RentalID = ?",
      [RentalID]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "La location a été supprimée avec succès." });
    } else {
      res.status(404).json({ message: "La location spécifiée n'existe pas." });
    }

    console.log("Résultat de la suppression :", result);
  } catch (error) {
    res.status(500).json({});
  }
};

const updateRental = async (req, res) => {
  try {
    const {
      Image,
      NameRental,
      DescriptionRental,
      RentalStartDate,
      RentalEndDate,
      TotalRentalAmount,
    } = req.body;

    if (
      !Image ||
      !NameRental ||
      !DescriptionRental ||
      !RentalStartDate ||
      !RentalEndDate ||
      !TotalRentalAmount
    ) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const sql = `UPDATE rental 
                 SET Image = ?, NameRental = ?, DescriptionRental = ?, RentalStartDate = ?, RentalEndDate = ?, TotalRentalAmount = ? 
                 WHERE RentalID = ? `;

    const values = [
      Image,
      NameRental,
      DescriptionRental,
      RentalStartDate,
      RentalEndDate,
      TotalRentalAmount,
    ];

    const [result] = await pool.execute(sql, values);

    res.status(200).json(result);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  creatRental,
  allRental,
  deleteRental,
  updateRental,
};
