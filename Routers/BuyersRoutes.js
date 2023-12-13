const express = require("express");
const { createorder,getSellerCatalog,getSellers} = require("../Controllers/BuyerControllers")
const { isAuthenticated, isbuyers } = require("../Middleware/auth")
const router = express.Router();


router.route("/list-of-sellers").get(isAuthenticated, isbuyers, getSellers)
router.route("/seller-catalog/:sellerId").get(isAuthenticated, isbuyers,getSellerCatalog)
router.route("/create-order/:sellerId").post(isAuthenticated, isbuyers,createorder)

module.exports = router;