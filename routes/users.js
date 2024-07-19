const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");

const router = Router();

router
  .route("/register")
  .get((req, res) => res.status(201).render("register"))
  .post(registerUser);

router
  .route("/login")
  .get((req, res) => res.status(200).render("register"))
  .post(loginUser);

module.exports = router;
