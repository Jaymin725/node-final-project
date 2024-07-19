const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userControllers");
const passport = require("../config/passport");

const router = Router();

router
  .route("/register")
  .get((req, res) => res.status(201).render("register"))
  .post(registerUser);

router
  .route("/login")
  .get((req, res) => res.status(200).render("login"))
  .post(loginUser);

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/users/login",
  }),
  (req, res) => {
    res.render("profile", { username: req.user.username });
  }
);

router.get("/logout", logoutUser);

module.exports = router;
