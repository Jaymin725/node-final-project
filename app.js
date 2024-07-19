const express = require("express");
const apiRouter = require("./routes/api");
const indexRouter = require("./routes/index");

const port = 3000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(port, () => console.log("http://localhost:" + port));
