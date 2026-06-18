import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Product from "../models/Product.js";

const products = [

  {
    nombre: "Aria",
    stock: 12,
    precio: 19.99,
    imagen: "../src/assets/imgs/600x400-1.png",
    imagenDetalle: "../src/assets/imgs/D1.png",
    descripcion: "Print de ilustración digital de Aria Atreides. Impresión de calidad en papel de 200gr.",
    categoria: "Print"
  },
  {
    nombre: "Teclado Mecánico",
    stock: 10,
    precio: 89.99,
    imagen: "../src/assets/imgs/600x400-2.png",
    imagenDetalle: "../src/assets/imgs/D2.png",
    descripcion: "Teclado mecánico RGB con switches azules y estructura metálica.",
    categoria: "Camiseta"
  },
  {
    nombre: "Ratón Gaming",
    stock: 19,
    precio: 39.99,
    imagen: "../src/assets/imgs/600x400-3.png",
    imagenDetalle: "../src/assets/imgs/D3.png",
    descripcion: "Ratón ergonómico con DPI ajustable hasta 16.000.",
    categoria: "Camiseta"
  },
  {
    nombre: "Monitor 27'' 2K",
    stock: 1,
    precio: 249.99,
    imagen: "../src/assets/imgs/600x400-4.png",
    imagenDetalle: "../src/assets/imgs/D4.png",
    descripcion: "Monitor IPS de 27 pulgadas con resolución 2560x1440 y 144Hz.",
    categoria: "Print"
  },
  {
    nombre: "Altavoz Bluetooth",
    stock: 2,
    precio: 29.99,
    imagen: "../src/assets/imgs/600x400-5.png",
    imagenDetalle: "../src/assets/imgs/D5.png",
    descripcion: "Altavoz portátil resistente al agua con sonido 360°.",
    categoria: "Print"
  },
  {
    nombre: "Webcam Full HD",
    stock: 8,
    precio: 49.99,
    imagen: "../src/assets/imgs/600x400-6.png",
    imagenDetalle: "../src/assets/imgs/D6.png",
    descripcion: "Webcam Full HD 1080p con micrófono integrado y enfoque automático.",
    categoria: "Print"
  },
  {
    nombre: "Disco SSD 1TB",
    stock: 15,
    precio: 79.99,
    imagen: "../src/assets/imgs/600x400-7.png",
    imagenDetalle: "../src/assets/imgs/D7.png",
    descripcion: "Unidad SSD de 1TB con alta velocidad de lectura y escritura.",
    categoria: "Print"
  },
  {
    nombre: "Micrófono USB",
    stock: 6,
    precio: 69.99,
    imagen: "../src/assets/imgs/600x400-8.png",
    imagenDetalle: "../src/assets/imgs/D8.png",
    descripcion: "Micrófono USB profesional ideal para streaming y videollamadas.",
    categoria: "Camiseta"
  },
  {
    nombre: "Base Refrigeradora",
    stock: 11,
    precio: 24.99,
    imagen: "../src/assets/imgs/600x400-9.png",
    imagenDetalle: "../src/assets/imgs/D9.png",
    descripcion: "Base con ventiladores silenciosos para mantener tu portátil refrigerado.",
    categoria: "Print"
  },
  {
    nombre: "Hub USB-C",
    stock: 20,
    precio: 34.99,
    imagen: "../src/assets/imgs/600x400-10.png",
    imagenDetalle: "../src/assets/imgs/D10.png",
    descripcion: "Hub USB-C con HDMI, USB 3.0 y lector de tarjetas SD integrado.",
    categoria: "Print"
  }
];

const seedProducts = async () => {

    try {

        await connectDB();
        await Product.deleteMany();
        await Product.insertMany(products);

        console.log("Productos cargados correctamente");
        process.exit(0);

    } catch (error) {

        console.log(error.message);
        process.exit(1);

    }

};

seedProducts();

