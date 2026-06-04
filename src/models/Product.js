import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true       
    },

    descripcion: {
        type: String,
        required: true,
        trim: true    
    },

    categoria: {
        type: String,
        default: false
    },

    precio: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    imagen: {
        type: String,
        required: true,
        trim: true
    },

    imagenDetalle: {
        type: String,
        required: true,
        trim: true
    }

},

{
    timestamps: true,
},

);

const Product = mongoose.model("Product", productSchema); 

export default Product;