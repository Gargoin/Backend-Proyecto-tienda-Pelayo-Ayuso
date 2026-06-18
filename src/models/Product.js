import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio."],
        unique: true,
        minlength: [3, "El nombre debe tener al menos 3 caracteres"],
        trim: true       
    },

    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria."],
        minlength: [30, "La descripción debe tener al menos 30 caracteres"],
        trim: true    
    },

    categoria: {
        type: String,
        default: false
    },

    precio: {
        type: Number,
        required: [true, "El precio es obligatorio."]
    },

    stock: {
        type: Number,
        required: [true, "El stock es obligatorio."]
    },

    imagen: {
        type: String,
        required: [true, "La imagen es obligatoria."],
        trim: true
    },

    imagenDetalle: {
        type: String,
        required: true,
        required: [true, "La imagen del detalle es obligatoria."],
        trim: true
    }

},

{
    timestamps: true,
},

);

const Product = mongoose.model("Product", productSchema); 

export default Product;