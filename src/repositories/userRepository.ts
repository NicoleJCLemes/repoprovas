import { Users } from "@prisma/client";
import prisma from "../config/database.js"

export interface UserSignUp {
    email: string,
    password: string,
    passwordConfirmed: string
}

export type User = Omit<Users, "id">

export async function findById(id:number) {
    const user = await prisma.users.findFirst({
        where: {
            id
        }
    });
    return user
}

export async function findByEmail(email:string) {
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    });
    return user
}

export async function insert(body:User) {
    await prisma.users.create({
        data: body
    });
}