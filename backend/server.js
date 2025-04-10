import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware allows to parse/accept JSON data in the res.body

app.use("/api/products", productRoutes); // Mounting the product routes

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running at http://localhost:" + PORT);
});
