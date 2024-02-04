const mongoose = require('mongoose');

const catalog = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
     products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }]
});

const Catalog = mongoose.model("Catalog", catalog);

module.exports = Catalog;
