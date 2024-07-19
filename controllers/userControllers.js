const User = require("../models/User");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .json({ error: true, message: "Email already exists" });

  const newUser = new User({ username, email, password });

  try {
    await newUser.save();
    res.status(201).render("login");
  } catch (error) {
    console.error(error);
    res.status(500).render("register");
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ error: true, message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const payload = { id: user.id, name: user.name };

    jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.status(200).render("profile");
    });
  } else {
    return res.status(400).json({ error: true, message: "Password incorrect" });
  }
}

module.exports = { registerUser, loginUser };
