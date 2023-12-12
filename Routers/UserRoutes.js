const express = require("express");
const { register,login,logout } = require("../Controllers/UserControllers")

const router = express.Router();


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)


module.exports = router;