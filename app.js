import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Product from "./models/product.js";
import Order from "./models/order.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.log("❌ DB Connection Error:", err.message);
    process.exit(1);
  });


// ============================
// ADD PRODUCT
// ============================
app.post("/api/products/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      product: savedProduct,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});


// ============================
// GET ALL PRODUCTS
// ============================
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ============================
// GET SINGLE PRODUCT
// ============================
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: "Invalid ID format",
    });
  }
});


app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId: savedOrder._id,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});


// ============================
// SEED PRODUCT
// ============================
app.get("/api/seed", async (req, res) => {
  try {
    const sample = new Product({
      title: "সহীহ্ হজ্জ ও উমরাহ্ পালন",
      author: "আল্লামা মুহাম্মদ নাসিরুদ্দীন",
      price: 49,
      originalPrice: 65,
      discount: 25,
      image:
        "https://placehold.co/180x250/22c55e/white?text=Hajj+Book",
      category: "Islam",
    });

    await sample.save();

    res.send("Seed product added!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ============================
// SERVER
// ============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});