const mongoose = require("mongoose");

const TemplatesSchema = new mongoose.Schema({
    templateName: { type: String, required: true },
    templateType: { type: String, required: true },
    content: { type: String },
    isExample: { type: Boolean }
});

const Templates = mongoose.model("Templates", TemplatesSchema);

module.exports = Templates;
