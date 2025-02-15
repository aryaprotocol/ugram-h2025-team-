import { User } from '../models/User';
import { UserRepositoryPostgreSQL } from '../repositories/UserRepositoryPostgreSQL';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


export class UserController {
  private userRepository: UserRepositoryPostgreSQL;

  constructor(userRepository: UserRepositoryPostgreSQL) {
    console.log('UserController constructor');
    this.userRepository = userRepository;
  }



  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const {
        userName,
        firstName,
        lastName,
        email,
        phoneNumber,
      } = req.body;
      if (!userName || !firstName || !lastName || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }


    // 📌 Vérification et récupération de la photo de profil
    let profilePicture: string | undefined = undefined;
    if (req.file) {
      profilePicture = `/uploads/${req.file.filename}`; // Stockage du chemin relatif
    }

      const newUser = new User(
        uuidv4(),
        userName,
        firstName,
        lastName,
        email,
        phoneNumber,
        profilePicture
      );
      await this.userRepository.saveUser(newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Error creating user' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    console.log('UserController updateUser');
    try {
      const { id } = req.params;
      const { firstName, lastName, email, phoneNumber } = req.body;
      if (!firstName && !lastName && !email && !phoneNumber) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const updatedUser = await this.userRepository.updateUser(
        id,
        firstName,
        lastName,
        email,
        phoneNumber
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Error updating user' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error getting user:', error);
      return res.status(500).json({ error: 'Error getting user' });
    }
  }
}
