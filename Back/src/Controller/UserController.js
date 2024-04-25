const { pool } = require("../connexions/ConnexionSql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function Register(req, res) {
  try {
    const Email = req.Email;
    const Password = req.Password;
    const FirstName = req.FirstName;
    const LastName = req.LastName;

    const Hash = await bcrypt.hash(Password, 10);

    const [rows] = await pool.query(
      `INSERT INTO user (FirstName,LastName,Email,Password) VALUES (?,?,?,?)`,
      [FirstName, LastName, Email, Hash]
    );

    console.log(rows);
    res.json({ success: rows.affectedRows > 0 });
  } catch (error) {
    console.log(error.stack);
  }
}

// SELECT = login

const Login = async (req, res) => {
  if (!req.body.Email || !req.body.Password) {
    res.status(400).json({ error: "missing fields" });
    return;
  }
  let Email = req.body.Email;
  let Password = req.body.Password;

  try {
    const values = [Email, Password];
    const sql = `SELECT * FROM user WHERE Email =  ? `;
    const [result] = await pool.query(sql, values);

    if (result.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    } else {
      await bcrypt.compare(
        Password,
        result[0].Password,
        function (err, bcyrptresult) {
          if (err) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
          }

          const token = jwt.sign(
            {
              email: result[0].Email,
              id: result[0].Password,
            },
            process.env.MY_SUPER_SECRET_KEY,
            { expiresIn: "20d" }
          );
          console.log();
          res.status(200).json({ jwt: token });
          return;
        }
      );
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  Login,
  Register,
};
