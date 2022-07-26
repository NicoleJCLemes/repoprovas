import { findById, insert, User, UserSignUp, findByEmail } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUpService(body:UserSignUp) {

    const user = await findByUserEmail(body.email);
    if(user) {
        throw {
            type: "Conflict",
            message: "This email is already in use"
        }
    }

    await insert({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });
}

async function findByUserEmail(email:string) {
    const user = await findByEmail(email);
    return user
}

export async function findByUserId(id:number) {
    const user = await findById(id);
    if(!user) {
        throw {
            type: "Not Found",
            message: "No user was found"
        }
    }
    return user
}

export async function signInService(body:User) {

    const user = await findByUserEmail(body.email);
    if(!user) {
        throw {
            type: "Not Found",
            message: "No user was found"
        }
    }
    
    const passwordMatches = bcrypt.compareSync(body.password, user.password);
    if(!passwordMatches) {
        throw {
            type: "Unauthorized",
            message: "The password does not match"
        }
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
    return token
}