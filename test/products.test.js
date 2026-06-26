import {expect} from "chai";
import { test } from "mocha";
import request from "supertest";
import app from "../app.js";

import bcrypt from "bcryptjs";
import User from "../src/models/User.js";
import Product from "../src/models/Product.js";


describe("CRUD Products", function () {

    this.timeout(5000);

    before(async () => {
        User.deleteMany();

        const hash = await bcrypt.hash("abc.123-", 10);

         const user = {
            name: "Admin",
            email: "admin@test.com",
            password: hash,
            admin: true,
        };

        User.create(user);

    });


    test("debería traer un array de productos", async () => {
        const response = await request(app).get("/api/products");

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");

    });

    test("el admin debería poder crear un producto", async () => {
        
        await Product.deleteMany();

        const responseLogin = await request(app).post("/api/auth/login").send({
            email: "admin@test.com",
            password: "abc.123-",
            admin: true
        });

        const token = responseLogin.body.token;

        const product = {
            nombre: "the Citadel",
            descripcion: "Base con ventiladores silenciosos para mantener tu portátil refrigerado.",
            categoria: "Print",
            precio: 24.99,
            stock: 11,
            imagen: "../src/assets/imgs/600x400-9.png",
            imagenDetalle: "../src/assets/imgs/D9.png"
        };

        const response = await request (app).post("/api/products").send(product).set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("nombre");
        expect(response.body.nombre).to.equal("the Citadel");


    })
})