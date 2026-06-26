import {Router} from "express";

import {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    clearCart
} from "../controllers/cart.controller.js";

import {authMiddleware} from "../middlewares/auth.middleware.js";


const router = Router();

router.get( "/", authMiddleware, getCart );

router.post( "/", authMiddleware, addToCart );

router.put( "/:itemId", authMiddleware, updateCartItem );

router.delete( "/:itemId", authMiddleware, deleteCartItem );

router.delete( "/", authMiddleware, clearCart );


export default router;