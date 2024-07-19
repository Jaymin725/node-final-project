const mongoose = require("../config/mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
