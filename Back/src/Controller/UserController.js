const { pool } = require("../connexions/ConnexionSql");
const { transporter } = require("../connexions/mailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ObjectId } = require("bson");

async function Register(req, res) {
  try {
    const Email = req.Email;
    const Password = req.Password;
    const FirstName = req.FirstName;
    const LastName = req.LastName;

    const Hash = await bcrypt.hash(Password, 10);
    const activationToken = await bcrypt.hash(Email, 10);
    const cleanToken = activationToken.replaceAll("/", "");
    console.log({ activationToken: activationToken, cleanToken: cleanToken });

    const [rows] = await pool.query(
      `INSERT INTO user (FirstName,LastName,Email,Password,isActive,token) VALUES (?,?,?,?,?,?)`,
      [FirstName, LastName, Email, Hash, false, cleanToken]
    );

    if (rows.affectedRows > 0) {
      const info = await transporter.sendMail({
        from: `${process.env.SMTP_EMAIL}`,
        to: Email,
        subject: "Email activation",
        text: "Activate your remail",
        html: `<p> You need to activate your email, to access our services, please click on this link :
                <a href="http://localhost:3000/user/activate/${cleanToken}">Activate your email</a>
          </p>`,
      });
      console.log("Message sent: %s", info.messageId);
      console.log(rows);
      res.json({ success: rows.affectedRows > 0 });
      return;
    }
  } catch (error) {
    console.log(error.stack);
  }
}

// const valideAccount = async (req, res) => {
//   try {
//     const token = req.params.token;
//     const sql = `SELECT * FROM user WHERE token = ?`;
//     const values = [token];
//     const [result] = await pool.execute(sql, values);
//     if (!result) {
//       res.status(204).json({ error: "g pa trouvé" });
//       return;
//     }
//     await pool.execute(
//       `UPDATE user SET isActive = 1, token = NULL WHERE token = ?`,
//       [token]
//     );
//     res.status(200).json({ result: "c validé" });
//   } catch (error) {
//     res.status(500).json({ error: error.stack });
//     console.log(error.stack);
//   }
// };

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
    const sql = `SELECT * FROM user WHERE Email =  ?`;
    const [result] = await pool.query(sql, values);

    if (result.length === 0) {
      res
        .status(401)
        .json({ error: "Invalid credentials or account not activated" });
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

const testEmail = async (req, res) => {
  const info = await transporter.sendMail({
    from: `${process.env.SMTP_EMAIL}`,
    to: "lorenzopro38@gmail.com",
    subject:
      "Modifiez votre numéro de cb au plus vite, sinon la police vous arrêtera",
    text: "Hello world?",
    html: "<div> <h1>Attention danger, voullez vous vraiment allez en prison ?</h1> <p>Le présdident a remarquer que vous trichiez, veuillez payer l amende ci-jointe pour ne pas aller en prison. N envoyez pas cet email a la police svp, sinon on appelle l armée</p></div>",
  });

  console.log("Message sent: %s", info.messageId);
  res.status(200).json(`Message send with the id ${info.messageId}`);
};

module.exports = {
  Login,
  Register,
  testEmail,
  // valideAccount,
};
