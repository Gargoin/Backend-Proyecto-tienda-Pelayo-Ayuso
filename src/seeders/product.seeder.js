import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Product from "../models/Product.js";

const products = [

  {
    nombre: "Aria",
    stock: 12,
    precio: 70,
    imagen: "/imgs/600x400-1.jpg",
    imagenDetalle: "/imgs/D1.jpg",
    descripcion: "Impresión Fine Art calidad museo de 70 x 70 cm sobre papel de algodón 100% de 310 g/m². Impresión giclée de alta definición con acabado mate y excelente conservación del color.",
    categoria: "Print"
  },
  {
    nombre: "Body electric",
    stock: 10,
    precio: 70,
    imagen: "/imgs/600x400-2.jpg",
    imagenDetalle: "/imgs/D2.jpg",
    descripcion: "Impresión Fine Art calidad museo de 50 x 70 cm sobre papel de algodón 100% de 310 g/m². Impresión giclée de alta definición con acabado mate y excelente conservación del color.",
    categoria: "Print"
  },
  {
    nombre: "Firefish",
    stock: 30,
    precio: 29.50,
    imagen: "/imgs/600x400-3.jpg",
    imagenDetalle: "/imgs/D3.jpg",
    descripcion: "Camiseta premium de edición artística en algodón 100% peinado de 200 g/m². Una prenda de tacto suave, estructura sólida y acabado de calidad superior, con impresión de alta definición diseñada para conservar la intensidad y el detalle del diseño.",
    categoria: "Camiseta"
  },
  {
    nombre: "She",
    stock: 1,
    precio: 29.50,
    imagen: "/imgs/600x400-4.jpg",
    imagenDetalle: "/imgs/D4.jpg",
    descripcion: "Camiseta premium de edición artística en algodón 100% peinado de 200 g/m². Una prenda de tacto suave, estructura sólida y acabado de calidad superior, con impresión de alta definición diseñada para conservar la intensidad y el detalle del diseño.",
    categoria: "Camiseta"
  },
  {
    nombre: "Astro Machine",
    stock: 2,
    precio: 100,
    imagen: "/imgs/600x400-5.jpg",
    imagenDetalle: "/imgs/D5.jpg",
    descripcion: "Impresión Fine Art calidad museo de 115 x 200 cm sobre papel de algodón 100% de 310 g/m². Impresión giclée de alta definición con acabado mate y excelente conservación del color.",
    categoria: "Print"
  },
  {
    nombre: "Rain City",
    stock: 0,
    precio: 70,
    imagen: "/imgs/600x400-6.jpg",
    imagenDetalle: "/imgs/D6.jpg",
    descripcion: "Impresión Fine Art calidad museo de 45 x 70 cm sobre papel de algodón 100% de 310 g/m². Impresión giclée de alta definición con acabado mate y excelente conservación del color.",
    categoria: "Print"
  },
  {
    nombre: "the Winged",
    stock: 15,
    precio: 90,
    imagen: "/imgs/600x400-7.jpg",
    imagenDetalle: "/imgs/D7.jpg",
    descripcion: "Impresión Fine Art calidad museo de 150 x 80 cm sobre papel de algodón 100% de 310 g/m². Impresión giclée de alta definición con acabado mate y excelente conservación del color.",
    categoria: "Print"
  },
  {
    nombre: "Lux Ferre",
    stock: 6,
    precio: 95,
    imagen: "/imgs/600x400-8.jpg",
    imagenDetalle: "/imgs/D8.jpg",
    descripcion: "Impresión Fine Art calidad museo de 110 x 150 cm sobre papel de algodón 100% de 310 g/m². Impresión giclée de alta definición con acabado mate y excelente conservación del color.",
    categoria: "Print"
  },
  {
    nombre: "the Citadel",
    stock: 11,
    precio: 29.5,
    imagen: "/imgs/600x400-9.jpg",
    imagenDetalle: "/imgs/D9.jpg",
    descripcion: "Camiseta premium de edición artística en algodón 100% peinado de 200 g/m². Una prenda de tacto suave, estructura sólida y acabado de calidad superior, con impresión de alta definición diseñada para conservar la intensidad y el detalle del diseño.",
    categoria: "Camiseta"
  },
  {
    nombre: "the Tomb",
    stock: 20,
    precio: 29.5,
    imagen: "/imgs/600x400-10.jpg",
    imagenDetalle: "/imgs/D10.jpg",
    descripcion: "Camiseta premium de edición artística en algodón 100% peinado de 200 g/m². Una prenda de tacto suave, estructura sólida y acabado de calidad superior, con impresión de alta definición diseñada para conservar la intensidad y el detalle del diseño.",
    categoria: "Camiseta"
  }
];

const seedProducts = async () => {

    try {

        await connectDB();
        await Product.deleteMany();
        await Product.insertMany(products);

        process.exit(0);

    } catch (error) {
        process.exit(1);

    }

};

seedProducts();

