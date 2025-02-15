import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error("MONGO_URI non défini dans .env");
    }

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connecté");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
