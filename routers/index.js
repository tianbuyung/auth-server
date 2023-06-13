const express = require("express");
const router = express.Router();
const userApiRouter = require("./userApiRouter");
const userViewsRouter = require("./userViewsRouter");

router.use("/", userViewsRouter)
router.use("/api", userApiRouter);

module.exports = router;
