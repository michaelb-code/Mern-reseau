const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// AUTH
router.post("/register", authController.signUp);

// USER DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo)

module.exports = router;