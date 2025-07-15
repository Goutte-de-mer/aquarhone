const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../db/models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Utilisateur introuvable" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe incorrect" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      })
      .json({
        message: "Connexion réussie",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token").json({ message: "Déconnexion réussie" });
};

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      })
      .json({
        message: "Inscription réussie",
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
