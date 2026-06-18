import {expect} from "chai";
import { test } from "mocha";
import request from "supertest";
import app from "../app.js";

import User from "../src/models/User.js";

describe ("Auth User", function () {
    this.timeout(5000);

    test("debería crear un usuario", async () => {

        await User.deleteMany({email: "test@test.com"});

        const user = {
            name: "User",
            email: "test@test.com",
            password: "abc.123-",
        };

        const response = await request(app).post("/api/auth/register").send(user);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("message", "Usuario registrado correctamente");


    });

    test("debería retornar un status 400 si el usuario ya existe", async () => {

        const user = {
            name: "User",
            email: "test@test.com",
            password: "abc.123-",
        };

        const response = await request(app).post("/api/auth/register").send(user);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("message", "El correo ya está registrado");

        
    });

    test("debería retornar un token si el email y password son conrrectos", async () => {
        
        const user = {
            email: "test@test.com",
            password: "abc.123-",
        };

        const response = await request(app).post("/api/auth/login").send(user);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("token");

    })

});