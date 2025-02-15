import { Request, Response } from "express";
import mongoose from "mongoose";
import Image from "../models/Image";

/**
 * Téléverse une nouvelle image avec ses métadonnées
 */
export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description, hashtags, mentions, userId } = req.body;

    // Vérifier si une image a bien été envoyée
    if (!req.file) {
      res.status(400).json({ message: "Aucune image fournie" });
      return;
    }

    // Vérifier si `userId` est valide
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "ID utilisateur invalide" });
      return;
    }

    // Vérifier et convertir `mentions` en ObjectId[]
    let mentionsArray: mongoose.Types.ObjectId[] = [];
    if (mentions) {
      try {
        const parsedMentions = JSON.parse(mentions); // Convertir une chaîne JSON en tableau
        if (Array.isArray(parsedMentions)) {
          mentionsArray = parsedMentions.map((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new Error(`ID mention invalide : ${id}`);
            }
            return new mongoose.Types.ObjectId(id);
          });
        }
      } catch (error) {
        console.error("❌ Erreur lors de la conversion des mentions :", error);
        res.status(400).json({ message: "Format des mentions invalide" });
        return;
      }
    }

    // Création et sauvegarde de l'image
    const newImage = new Image({
      user: new mongoose.Types.ObjectId(userId),
      description,
      hashtags: hashtags ? hashtags.split(",") : [],
      mentions: mentionsArray,
      imageUrl: `/uploads/${req.file.filename}`
    });

    await newImage.save();
    res.status(201).json({ message: "Image téléversée avec succès", image: newImage });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Téléverse une nouvelle image avec ses métadonnées
 */

export const updateImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description, hashtags, mentions } = req.body;

    // Vérifier si l’image existe
    const image = await Image.findById(req.params.id);
    if (!image) {
      res.status(404).json({ message: "Image non trouvée" });
      return;
    }

    // Convertir `mentions` en ObjectId[] si fourni
    let mentionsArray: mongoose.Types.ObjectId[] = image.mentions;
    if (mentions) {
      try {
        if (!Array.isArray(mentions)) {
          throw new Error("Le champ mentions doit être un tableau d'ObjectId");
        }
        mentionsArray = mentions.map((id) => {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`ID mention invalide : ${id}`);
          }
          return new mongoose.Types.ObjectId(id);
        });
      } catch (error) {
        console.error("❌ Erreur lors de la conversion des mentions :", error);
        res.status(400).json({ message: "Format des mentions invalide" });
        return;
      }
    }

    // Mise à jour des champs
    image.description = description ?? image.description;
    image.hashtags = hashtags ? hashtags.split(",") : image.hashtags;
    image.mentions = mentionsArray;

    await image.save();
    res.json({ message: "Image mise à jour avec succès", image });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};



/**
 * Supprime une image
 */
export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      res.status(404).json({ message: "Image non trouvée" });
      return;
    }
    res.json({ message: "Image supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupère toutes les images d'un utilisateur
 */
export const getUserImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const images = await Image.find({ user: req.params.userId });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupère toutes les images triées par date de création
 */
export const getAllImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupère une image spécifique par ID
 */
export const getImageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      res.status(404).json({ message: "Image non trouvée" });
      return;
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
