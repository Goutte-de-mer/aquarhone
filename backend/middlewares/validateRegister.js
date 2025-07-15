const { body, validationResult } = require("express-validator");

const validateRegister = [
  body("firstName").trim().notEmpty().withMessage("Le prénom est requis"),
  body("lastName").trim().notEmpty().withMessage("Le nom est requis"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("L'email n'est pas valide"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateRegister;
