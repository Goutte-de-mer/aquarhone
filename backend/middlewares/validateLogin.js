const { body, validationResult } = require("express-validator");

const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("L'email n'est pas valide"),
  body("password").trim().notEmpty().withMessage("Le mot de passe est requis"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateLogin;
