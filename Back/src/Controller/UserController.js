const { pool } = require("../connexions/ConnexionSql");

async function Register(req, res) {
  try {
    const Email = req.Email;
    const Password = req.Password;
    const FirstName = req.FirstName;
    const LastName = req.LastName;
    const [rows] = await pool.query(
      `INSERT INTO user (FirstName,LastName,Email,Password) VALUES (?,?,?,?)`,
      [FirstName, LastName, Email, Password]
    );

    console.log(rows);
    //  rows.affectedRows > 0  return vrai si c'est bien insérer False sinon
    res.json({ success: rows.affectedRows > 0 });
  } catch (error) {
    console.log(error.stack);
  }
}

// SELECT = login

async function Login(req, res) {
  try {
    const Email = req.Email;
    const Password = req.Password;
    const [rows] = await pool.query(
      `SELECT user (Email,Password) VALUES (?,?)`,
      [UserId, FirstName, LastName, Email, Password]
    );

    console.log(rows);
    //  rows.affectedRows > 0  return vrai si c'est bien insérer False sinon
    res.json({ success: rows.affectedRows > 0 });
  } catch (error) {
    console.log(error.stack);
  }
}

module.exports = {
  Login,
  Register,
};
