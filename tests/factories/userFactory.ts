import prisma from "../../src/config/database.js";
import bcrypt from "bcrypt";
import { User } from "../../src/repositories/userRepository.js";

function createUser() {
    const body = {
        email: "nicole-teste@driven.com",
        password: "123",
        passwordConfirmed: "123"
    }
    return body
}

async function postUser(body: User) {
    await prisma.users.create({
        data: {
            email: body.email,
            password: bcrypt.hashSync(body.password, 10)
        }
    })
}

const userFactory = {
    createUser,
    postUser
}

export default userFactory;