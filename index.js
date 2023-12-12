const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config({
    path: "./config/config.env"
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(300,()=>{
    console.log("hi")
})







