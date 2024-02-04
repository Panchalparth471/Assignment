const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.URL;

exports.database = () => {
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => { console.log("Database Connected") })
        .catch((e) => {
            console.log("Error in db connection");
            console.log(e);
        })
}



