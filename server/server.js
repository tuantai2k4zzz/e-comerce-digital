const express = require("express");
require('dotenv').config()
const dbConnect = require("./config/dbconnect");
const userRoutes = require("./routes");

const app = express();
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
dbConnect();
userRoutes(app);



app.use('/', (req, res) => {
    res.send("E-comerce Server is running")
})

app.listen(port, () => {
    console.log("Server running on the port: ",port)
})
