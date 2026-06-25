import Cart from "../models/cart.js";
import Product from "../models/Product.js";



export const getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({
      usuario: userId,
    }).populate("items.producto");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo carrito",
    });
  }
};



export const addToCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const { producto, cantidad, talla } = req.body;
    
    const product = await Product.findById(producto);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const categoria = product.categoria?.toLowerCase().trim();
   
    if (product.stock < cantidad) {
      return res.status(400).json({
        message: "No hay stock suficiente",
      });
    }

    product.stock -= cantidad;
    await product.save();

    let cart = await Cart.findOne({usuario: userId,});

    
    if (!cart) {
      cart = await Cart.create({
        usuario: userId,
        items: [],
      });
    }

    
    const itemExistente = cart.items.find(
      (item) =>
        item.producto.toString() === producto &&
        item.talla === talla
    );

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      cart.items.push({
        producto,
        cantidad: Math.max(1, Number(cantidad) || 1),
        talla,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error añadiendo al carrito",
    });
  }
};




export const updateCartItem = async (req, res) => {
  const userId = req.user.userId;

  try {
    const { itemId } = req.params;
    const { cantidad, talla } = req.body;

    const cart = await Cart.findOne({
      usuario: userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Elemento no encontrado",
      });
    }

    const product = await Product.findById(item.producto);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    if (cantidad !== undefined) {
      const diferencia = cantidad - item.cantidad;

      if (diferencia > 0) {
        if (product.stock < diferencia) {
          return res.status(400).json({
            message: "No hay stock suficiente",
          });
        }
        product.stock -= diferencia;
      }

      if (diferencia < 0) {
        product.stock += Math.abs(diferencia);
      }

      item.cantidad = cantidad;
      await product.save();
    }

    if (talla !== undefined) {
      item.talla = talla;
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error actualizando carrito",
    });
  }
};



export const deleteCartItem = async (req, res) => {
  const userId = req.user.userId;

  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({
      usuario: userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Elemento no encontrado",
      });
    }

    const product = await Product.findById(item.producto);

    if (product) {
      product.stock += item.cantidad;
      await product.save();
    }

    cart.items.pull(itemId);

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error eliminando producto",
    });
  }
};



export const clearCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({
      usuario: userId,
    });

    if (!cart) {
      return res.json({ items: [] });
    }

    for (const item of cart.items) {
      const product = await Product.findById(item.producto);

      if (product) {
        product.stock += item.cantidad;
        await product.save();
      }
    }

    cart.items = [];

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error vaciando carrito",
    });
  }
};