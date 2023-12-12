const express = require("express");
const { createCatolog,createProduct,getOrders } = require("../Controllers/SellerControllers")
const {isAuthenticated,issellers} = require("../Middleware/auth")
const router = express.Router();


router.route("/create-catalog").post(isAuthenticated,issellers,createCatolog)
router.route("/orders").get(isAuthenticated,issellers,getOrders)
router.route("/createProduct").post(isAuthenticated,issellers,createProduct)

module.exports = router;