const express = require("express");
const { createOrder,getSellerCatalog,getSellers} = require("../Controllers/BuyerControllers")
const { isAuthenticated, isbuyers } = require("../Middleware/auth")
const router = express.Router();


router.route("/list-of-sellers").post(isAuthenticated, isbuyers, getSellers)
router.route("/seller-catalog/:seller_id").get(isAuthenticated, isbuyers,getSellerCatalog)
router.route("/create-order/:seller_id").post(isAuthenticated, isbuyers,createOrder)

module.exports = router;