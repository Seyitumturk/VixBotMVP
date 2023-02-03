const mongoose = require("mongoose");

const ProductInfoSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productDescription: { type: String },
    whitepaper: { type: String }
});

const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);

module.exports = ProductInfo;
