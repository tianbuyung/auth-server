const express = require("express");
const router = express.Router();
const userApiController = require("../controllers/api/userApiController");

router.post("/register", userApiController.createNewUser);
router.post("/login", userApiController.loginUser);
router.get("/users", userApiController.getAllUsers);

module.exports = router;
