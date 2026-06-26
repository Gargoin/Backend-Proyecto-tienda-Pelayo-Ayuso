import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
connectDB();

import express from "express";

import productRouter from "./src/routes/product.router.js";
import authRouter from "./src/routes/auth.router.js";
import cartRoutes from "./src/routes/cart.routes.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json ({message: "Hola!"});
});

app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRoutes);

export default app;