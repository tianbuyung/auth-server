const express = require("express");
const router = express.Router();
const UserViewsController = require("../controllers/views/userViewsController");

router.get('/', UserViewsController.getHomePage);

router.get("/register", UserViewsController.getRegisterPage);
router.post("/register", UserViewsController.createNewUser);

router.get("/login", UserViewsController.getLoginPage);
router.post("/login", UserViewsController.loginUser);

router.get("/users", UserViewsController.getUsersPage);

module.exports = router;
