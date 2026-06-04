import {Router} from "express";
import Product from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
    try {

        const products = await Product.find();
        res.json(products);

    } catch (error) {

        console.log(error.message);
        res.status(500).json({message: "Error al optener los productos"});

    }
})

export default router;