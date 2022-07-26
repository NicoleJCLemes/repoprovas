import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import userFactory from "./factories/userFactory.js";
import testFactory from "./factories/testFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'nicole-teste@driven.com'`
    await prisma.$executeRaw`DELETE FROM tests WHERE name = 'prova top teste'`;
})

describe("POST /tests", () => {
    it("given test data, create test", async () => {
        const body = userFactory.createUser();
        await userFactory.postUser(body);

        const response = await supertest(app).post("/sign-in").send({
            email: body.email,
            password: body.password
        });
        const token = response.text;

        const test = testFactory.createTest();
        const response2 = await supertest(app).post("/tests").set("Authorization", `Bearer ${token}`).send(test);
        expect(response2.status).toEqual(201);

        const testConfirmation = await prisma.tests.findFirst({
            where: {
                name: "prova top teste"
            }
        });
        expect(test.name).toEqual(testConfirmation.name);
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
        const response1 = await supertest(app).post("/tests").set("Authorization", `Bearer ${token}`).send({...test, categoryId: 10000});
        expect(response1.status).toEqual(404);

        const response2 = await supertest(app).post("/tests").set("Authorization", `Bearer ${token}`).send({...test, teacherDisciplineId: 10000});
        expect(response2.status).toEqual(404);
    });
});

describe("GET /tests", () => {
    it("given invalid query string, receive unprocessable entity error (422)", async () => {
        const body = userFactory.createUser();
        await userFactory.postUser(body);

        const loginResponse = await supertest(app).post("/sign-in").send({
            email: body.email,
            password: body.password
        });
        const token = loginResponse.text;

        testFactory.createTest();
        const response1 = await supertest(app).get("/tests").set("Authorization", `Bearer ${token}`);
        expect(response1.status).toEqual(422);

        const response2 = await supertest(app).get("/tests?groupBy=terms").set("Authorization", `Bearer ${token}`);
        expect(response2.status).toEqual(422);
    });

    it("given query string = disciplines || teachers, receive tests by discipline", async () => {
        const body = userFactory.createUser();
        await userFactory.postUser(body);

        const loginResponse = await supertest(app).post("/sign-in").send({
            email: body.email,
            password: body.password
        });
        const token = loginResponse.text;

        testFactory.createTest();
        const disciplinesResponse = await supertest(app).get("/tests?groupBy=disciplines").set("Authorization", `Bearer ${token}`);
        expect(disciplinesResponse.status).toEqual(200);

        const teachersResponse = await supertest(app).get("/tests?groupBy=teachers").set("Authorization", `Bearer ${token}`);
        expect(teachersResponse.status).toEqual(200);
    });
});