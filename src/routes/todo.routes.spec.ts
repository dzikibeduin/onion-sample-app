import app from "../app";

import request from "supertest";

describe("GET all todos", () => {

    it ("returns status code 200", async () => {
        const res = await request(app)
            .get('/')
            
        expect(res.statusCode).toEqual(200);
    })
});