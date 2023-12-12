const express = require("express")
const bodyParser = require("body-parser")
const userRoutes = require("./Routers/UserRoutes")
const buyerRoutes = require("./Routers/BuyersRoutes")
const sellerRoute = require("./Routers/SellersRoutes")
const ErrorMiddleware = require("./Middleware/Error")



require("dotenv").config({
    path: "./Config/config.env"
});
const app = express();
const { connectDb } = require("./Config/Database")
app.use(express.json());
connectDb();


app.use(ErrorMiddleware)
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth",userRoutes)
app.use("/api/buyer",buyerRoutes)
app.use("/api/seller",sellerRoute)

app.listen(process.env.PORT,()=>{
    console.log("hi")
})







