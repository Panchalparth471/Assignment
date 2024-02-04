const mongoose = require("mongoose");
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true,
    },
    confirmPassword: {
        type: String,
        required: true,
        trim:true
    },
    accountType: {
        type: String,
        enum: ['buyer', 'seller'],
        required: true 
    }
})


module.exports = mongoose.model("User", User);