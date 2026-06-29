import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { sortBy = "createdAt", order = "asc", categoria } = req.query;
    const filter = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    if (categoria && categoria !== "Todas las categorías") {
      filter.categoria = categoria;
    }

    const products = await Product.find(filter)
      .select("-__v")
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no econtrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      categoria,
      precio,
      stock,
      imagen,
      imagenDetalle,
    } = req.body;

    if (!nombre || nombre.trim() === "" || nombre.length < 3) {
      return res
        .status(422)
        .json({
          message:
            " El nombre es obligatorio y debe tener al menos 3 caracteres.",
        });
    }

    if (
      !nombre ||
      !descripcion ||
      !categoria ||
      !precio ||
      !stock ||
      !imagen ||
      !imagenDetalle
    ) {
      return res
        .status(422)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    if (error.name == "validationError") {
      return res.status(422).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof req.body.nombre != "string") {
      return res.status(422).json({ message: "El nombre debe ser un string" });
    }

    if (typeof req.body.descripcion != "string") {
      return res
        .status(422)
        .json({ message: "La descripción debe ser un string" });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto borrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al borrar el producto" });
  }
};
