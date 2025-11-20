const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");

const multer = require('multer');
const upload = multer();

// AUTH
router.post("/register", authController.signUp); // Création d'un utilisateur
router.post('/login', authController.signIn);
router.get("/logout", authController.logout);

// USER DataBase
router.get("/", userController.getAllUsers); // récupérer tous les utilisateurs
router.get("/:id", userController.userInfo); // récupérer un utilisateur
router.put("/:id", userController.updateUser);// modifier un utilisateur
router.delete("/:id", userController.deleteUser); // supprimer un utilisateur
router.patch("/follow/:id", userController.followUser);// suivre un utilisateur
router.patch("/unfollow/:id", userController.unfollowUser);// ne plus suivre un utilisateur

//UPLOAD 
router.post("/upload",upload.single("file"),uploadController.uploadProfil)

module.exports = router;