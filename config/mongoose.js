const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jayminbhavsar07:jaymin725@cluster0.st74cjp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected to the database"));

module.exports = mongoose;
