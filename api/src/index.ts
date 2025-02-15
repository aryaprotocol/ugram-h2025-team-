import express from 'express';
import userRoutes from './routes/UserRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Permettre l’accès aux fichiers statiques (images)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
