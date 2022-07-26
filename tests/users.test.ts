import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import userFactory from "./factories/userFactory.js";
import bcrypt from "bcrypt";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'nicole-teste@driven.com'`;
})

describe("POST /sign-up", () => {
    it("given email, password and password confirmation, create user", async () => {
        
        const body = userFactory.createUser();

        const response = await supertest(app).post("/sign-up").send({
            email: body.email,
            password: bcrypt.hashSync(body.password, 10)
        });

        expect(response.status).toEqual(201);

        const user = await prisma.users.findFirst({
            where: {
                email: body.email
            }
        });

        expect(user.email).toEqual(body.email);
    });

    it("given email and password already in use, fail to create user", async () => {

        const body = userFactory.createUser();
        await userFactory.postUser(body)

        const response = await supertest(app).post("/sign-up").send({
            email: body.email,
            password: bcrypt.hashSync(body.password, 10)
        });

        expect(response.status).toEqual(409);
    });

    it("given password and password confirmation, fail to accept different passwords", async () => {
        
        const body = userFactory.createUser();

        const response = await supertest(app).post("/sign-up").send({...body, passwordConfirmed: "random_password"});
        expect(response.status).toEqual(422);
    });

    it("given invalid fields, receive unprocessable entity error (422)", async () => {

        const body = userFactory.createUser();
        const noEmail = {...body, email: ""};
        const noPassword = {...body, password: "", passwordConfirmed: ""};

        const response = await supertest(app).post("/sign-up").send(noEmail);
        const response2 = await supertest(app).post("/sign-up").send(noPassword);

        expect(response.status).toEqual(422);
        expect(response2.status).toEqual(422);
    })
});

describe("POST /sign-in", () => {
    it("given email and password, receive token", async () => {
        const body = userFactory.createUser();
        await userFactory.postUser(body);

        const response = await supertest(app).post("/sign-in").send({
            email: body.email,
            password: body.password
        });

        expect(response.status).toEqual(200);
        expect(response.text).not.toBeNull();
    });

    it("given invalid fields, receive unprocessable entity error (422)", async () => {
        const body = userFactory.createUser();
        await userFactory.postUser(body);

        const response = await supertest(app).post("/sign-in").send({
            email: "nicole.com",
            password: body.password
        });

        expect(response.error).not.toEqual(false);
        expect(response.status).toEqual(422);
    });

    it("given invalid password, receive unauthorized error (401)", async () => {
        const body = userFactory.createUser();
        await userFactory.postUser(body);

        const response = await supertest(app).post("/sign-in").send({
            email: body.email, 
            password: "random_password"
        });
        
        expect(response.status).toEqual(401);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});