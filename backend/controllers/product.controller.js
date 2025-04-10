import mongoose from 'mongoose';

import Product from '../models/product.js'; // Importing the Product model

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Fetching all products from the database
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createProduct = async (req, res) => {
        const product = req.body; // user will send product data in the request body
    
        if (!product.name || !product.price || !product.image) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
    
        const newProduct = new Product(product)
    
        try {
            await newProduct.save();
            res.status(201).json({ success: true, data: newProduct});
        } catch (error) {
            console.error("Error in Create product:", error.message);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    };

    export const updateProduct = async (req, res) => {
        const {id} = req.params; // Extracting the product ID from the request parameters
        const product = req.body; // user will send product data in the request body
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: 'Invalid product ID' });
        }
    
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // Updating the product by ID
            res.status(200).json({ success: true, data: updatedProduct });
        } catch (error) {
            console.error("Error in updating product:", error.message);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    };

    export const deleteProduct = async (req, res) => {
        const {id} = req.params; // Extracting the product ID from the request parameters

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: 'Invalid product ID' });
        }
    
        try {
            await Product.findByIdAndDelete(id); // Deleting the product by ID
            res.status(200).json({ success: true, message: 'Product deleted successfully' });
        } catch (error) {
            console.error("Error in deleting product:", error.message);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    };