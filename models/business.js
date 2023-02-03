const mongoose = require("mongoose");

const BusinessInfoSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    questionsOutline: [{ type: String }],
    whitepaper: { type: String },
    isEditableByAdmin: { type: Boolean, default: true }
});

const BusinessInfo = mongoose.model("BusinessInfo", BusinessInfoSchema);

module.exports = BusinessInfo;
