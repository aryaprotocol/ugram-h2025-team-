import express from "express";
import multer from "multer";
import { uploadImage, updateImage, deleteImage, getUserImages, getAllImages, getImageById } from "../controllers/imageController";

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

// Routes pour la gestion des images
router.post("/upload", upload.single("image"), uploadImage);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);
router.get("/user/:userId", getUserImages);
router.get("/", getAllImages);
router.get("/:id", getImageById);

export default router;
