import request from "supertest";
import express from "express";

const app = express();

describe("GET all todos", () => {

    test("returns status code 200", async () => {
        const res = await request(app)
            .get('/');
            
        expect(res.statusCode).toEqual(200);
    });
});

describe("POST /create new Todo", () => {

    test("returns status 400 if no params", async () => {
        const res = await request(app)
            .post('/')
            .send({});

        expect(res.statusCode).toEqual(400);
    });
});