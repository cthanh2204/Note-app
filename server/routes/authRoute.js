const express = require("express");
const authControllers = require("../controllers/authControllers");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.get("/get-user", verifyToken, authControllers.getUser);
module.exports = router;
