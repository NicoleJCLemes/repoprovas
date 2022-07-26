import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import userFactory from "./factories/userFactory.js";
import testFactory from "./factories/testFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'nicole-teste@driven.com'`;
})

describe("POST /test", () => {
    it("given test data, create test", async () => {
        const body = userFactory.createUser();
        await userFactory.postUser(body);

        const response = await supertest(app).post("/sign-in").send({
            email: body.email,
            password: body.password
        });
        const token = response.text;

        const test = testFactory.createTest();
        const response2 = await supertest(app).post("/test").set("Authorization", `Bearer ${token}`).send(test);
        expect(response2.status).toEqual(201);
    });

    it("given invalid data, fail to create test", async () => {
        const body = userFactory.createUser();
        await userFactory.postUser(body);

        const loginResponse = await supertest(app).post("/sign-in").send({
            email: body.email,
            password: body.password
        });
        const token = loginResponse.text;

        const test = testFactory.createTest();
        const response1 = await supertest(app).post("/test").set("Authorization", `Bearer ${token}`).send({...test, categoryId: 10000});
        expect(response1.status).toEqual(404);

        const response2 = await supertest(app).post("/test").set("Authorization", `Bearer ${token}`).send({...test, teacherDisciplineId: 10000});
        expect(response2.status).toEqual(404);
    });
});