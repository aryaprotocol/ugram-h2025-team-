import express from "express";
import { createUser, getUsers, getUserById, getUserProfile, updateUserProfile } from "../controllers/userController";
import multer from "multer";

const router = express.Router();

// Configuration de multer pour stocker les fichiers dans "uploads/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Route pour créer un utilisateur avec photo de profil
router.post("/register", upload.single("profilePicture"), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", updateUserProfile);

export default router;
