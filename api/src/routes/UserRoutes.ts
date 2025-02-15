import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserRepositoryPostgreSQL } from '../repositories/UserRepositoryPostgreSQL';
import multer from 'multer';
import path from 'path';

const router = Router();
console.log('UserRoutes constructor');
const userRepository = new UserRepositoryPostgreSQL();
const userController = new UserController(userRepository);

// Configuration multer (stocke les images localement dans "uploads/")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où les images seront stockées
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage  });

router.post('',upload.single('profilePicture'), (req, res) => {
  userController.createUser(req, res);
});

router.patch('/:id', (req, res) => {
  userController.updateUser(req, res);
});

router.get('/:id', (req, res) => {
  userController.getUserById(req, res);
});

export default router;
