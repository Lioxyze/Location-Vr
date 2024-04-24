const { pool } = require("../connexions/ConnexionSql");
let cors = require("cors");

//  Ajouter un student dans la table  une fois que le middleware est validé
const CreateRental = async (req, res) => {
  try {
    const name = req.name;
    const [rows] = await pool.query(
      `INSERT INTO student (student_name) VALUES (?)`,
      [name]
    );

    console.log(rows);
    //  rows.affectedRows > 0  return vrai si c'est bien insérer False sinon
    res.json({ success: rows.affectedRows > 0 });
  } catch (error) {
    console.log(error.stack);
  }
};

//Sélection de tous les étudiants avec leurs formations associées;
const ctrlTrainingStudents = async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT student_name AS nom,
                                          training_name AS formation
                                          FROM
                                          student
                                          JOIN training ON training.training_id = student.training_id`);

    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Sélection de tous les formations avec le nombre total d'étudiants inscrits
const ctrlTrainingCount = async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT
                                                  *,
                                                  COUNT(student.student_id)
                                                  FROM
                                                  student
                                                  right JOIN training ON training.training_id = student.training_id
                                                  GROUP BY
                                                  training.training_id`);

    res.json({ data: rows });
  } catch (error) {
    res.json({ message: "erreur serveur" });
  }
};

// Supprimer les formations qui n'ont pas d'inscrits
const ctrltrainingDelete = async (req, res) => {
  try {
    const [rows] = await pool.execute(`DELETE
                                        FROM
                                        training
                                        WHERE
                                        training_id not IN(
                                            SELECT
                                            training_id
                                            FROM
                                            student
                                            WHERE
                                            training_id IS not NULL
        )`);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};

//  Modifier la table training en fonction d'un id fourni par l'utilisateur aprés avoir valider le middleware
const ctrlUpdateTraining = async (req, res) => {
  try {
    //  req.data, req. req.values sont récuperés depuis le middleware verifUpdate
    let data = req.data;
    let values = req.values;
    const sql = `UPDATE training SET ${data} where training_id= ? `;
    const [result] = await pool.execute(sql, values);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};
//
//  selectionner les etudiants qui sont inscrits dans une formation en cours
const ctrlstudentOngoing = async (req, res) => {
  try {
    const sql = `SELECT
                    student_name
                    FROM
                    student
                    JOIN training ON training.training_id = student.training_id
                    WHERE
                    training.training_status = "ongoing"`;
    const [rows, fields] = await pool.query(sql);
    //  la je spécifie juste de m'afficher les noms des etudiants et pas en format (clé, valeur)
    const data = rows.map((row) => {
      return row.student_name;
    });
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur du serveur" });
  }
};

module.exports = {
  CreateRental,
  ctrlTrainingStudents,
  ctrlTrainingCount,
  ctrltrainingDelete,
  ctrlUpdateTraining,
  ctrlstudentOngoing,
};
