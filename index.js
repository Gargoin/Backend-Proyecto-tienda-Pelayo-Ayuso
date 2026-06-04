import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
connectDB();

import express from "express";

const app = express();


app.get("/", (req, res) => {
    res.json ({message: "Hola!"});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http//localhost:${PORT}`));

