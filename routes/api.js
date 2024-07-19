const { Router } = require("express");
const userRouter = require("./users");

const router = Router();

router.use("/users", userRouter);

router.get("/", (req, res) => res.end("api"));

module.exports = router;
