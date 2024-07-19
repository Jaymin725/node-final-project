const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(400).redirect("/users/register");

  const newUser = new User({ username, email, password });

  try {
    await newUser.save();
    res.status(201).redirect("/users/login");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/users/register");
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).redirect("/users/login");

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const payload = { id: user.id, name: user.name };

    jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).redirect("/users/profile");
    });
  } else {
    return res.status(400).redirect("/users/login");
  }
}

function logoutUser(req, res) {
  res.cookie("jwt", "");
  res.redirect("/users/login");
}

module.exports = { registerUser, loginUser, logoutUser };
