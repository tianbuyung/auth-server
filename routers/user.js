const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/register", UserController.createNewUser);
router.post("/login", UserController.loginUser);

module.exports = router;
