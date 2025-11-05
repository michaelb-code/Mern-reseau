const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// AUTH
router.post("/register", authController.signUp); // Création d'un utilisateur

// USER DB
router.get("/", userController.getAllUsers); // recuperer tous les utilisateurs
router.get("/:id", userController.userInfo); // recuperer un utilisateur
router.put("/:id", userController.updateUser);// modifier un utilisateur
router.delete("/:id", userController.deleteUser); // supprimer un utilisateur
router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.unfollowUser);

module.exports = router;