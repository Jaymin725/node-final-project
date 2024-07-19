const express = require("express");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/api");
const indexRouter = require("./routes/index");
const passport = require("./config/passport");

const port = 3000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(port, () => console.log("http://localhost:" + port));
