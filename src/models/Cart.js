import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({

    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    cantidad: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },


    talla: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL"],
        required: function(){

            return this.categoria === "Camiseta";

        }
    }

});

const cartSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    items: [
        cartItemSchema
    ]
},
{
    timestamps: true
});

const Cart = mongoose.model(
    "Cart",
    cartSchema
);


export default Cart;