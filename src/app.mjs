import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRoutes from './routes/products.mjs';

dotenv.config();

const app = express();
const PORT = 3000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// Routes
console.log('Product routes loaded:', productsRoutes);
app.use('/api/products', productsRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Try visiting: http://localhost:${PORT}/api/products`);
});