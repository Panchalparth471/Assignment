const mongoose = require("mongoose");

const product = new mongoose.Schema({
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catalog",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Product", product);
