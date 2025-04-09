import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.post('/products', async (req, res) => {
    const product = req.body; // user will send product data in the request body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product(product)

    try {
        await newProduce.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(3000, () => {
    connectDB();
    console.log("Server is running at http://localhost:3000");
});
