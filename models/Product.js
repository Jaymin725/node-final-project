const mongoose = require("../config/mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  catagory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catagory",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
