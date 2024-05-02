const validator = require("validator");

const verifDataRegister = (req, res, next) => {
  const { FirstName, LastName, Email, Password } = req.body;

  // Validation des données
  if (
    !validator.isEmail(Email)
    // !validator.isStrongPassword(Password) ||
    // !validator.isAlpha(FirstName) ||
    // !validator.isAlpha(LastName)
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

const verifUpdate = async (req, res, next) => {
  const id = req.params.id;
  const { name, status } = req.body;
  let data = [];
  let values = [];
  if (name) {
    data.push("training_name= ?");
    values.push(name);
  }
  if (status) {
    data.push("training_status= ?");
    values.push(status);
  }
  console.log(values);
  if (data.length == 0) {
    return res.json({ message: "vous avez modifier aucune donnée" });
  }
  values.push(id);
  data = data.join(",");
  req.data = data;
  req.values = values;
  next();
};

module.exports = { verifDataRegister };
