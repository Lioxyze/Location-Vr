const validator = require("validator");

const verifDataRegister = (req, res, next) => {
  const { FirstName, LastName, Email, Password } = req.body;

  // Validation des données
  if (
    !validator.isEmail(Email) ||
    !validator.isStrongPassword(Password) ||
    !validator.isAlpha(FirstName) ||
    !validator.isAlpha(LastName)
  ) {
    return res.status(400).json({ error: "Données invalides" });
  }

  // Nettoyage des données (optionnel)

  // Stockage des données dans la requête
  req.Email = Email;
  req.Password = Password;
  req.FirstName = FirstName;
  req.LastName = LastName;

  next();
};

module.exports = { verifDataRegister };
