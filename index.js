const express = require("express");
const app = express();
const { database } = require("./Config/database");

app.use(express.json());
require("dotenv").config();

const PORT = process.env.PORT;
app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log("SERVER STARTED");
})

app.get("/", (req, res) => {
    res.send('<h1>The Server is Up and Running</h1>');
})

database();