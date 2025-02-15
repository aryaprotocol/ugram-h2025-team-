import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import imageRoutes from "./routes/imageRoutes";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Servir les fichiers statiques (uploads de photos)
app.use("/uploads", express.static("uploads"));

// Routes API
app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);


const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
