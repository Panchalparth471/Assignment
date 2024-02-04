const mongoose = require('mongoose');

const order = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }]
});

const Order = mongoose.model("Order", order);

module.exports = Order;
