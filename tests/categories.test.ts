import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import userFactory from "./factories/userFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'nicole-teste@driven.com'`;
})

describe("GET /categories", () => {
    it("get categories", async () => {
        const body = userFactory.createUser();
        await userFactory.postUser(body);

        const response = await supertest(app).post("/sign-in").send({
            email: body.email,
            password: body.password
        });
        const token = response.text;

        const response2 = await supertest(app).get("/categories").set("Authorization", `Bearer ${token}`);
        expect(response2.text).not.toBeNull();
    });
});