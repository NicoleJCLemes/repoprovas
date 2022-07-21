import { findById, insert, User, UserSignUp, findByEmail } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export async function signUpService(body:UserSignUp) {

    if(body.password !== body.passwordConfirmed) {
        throw {
            type: "Unprocessable Entity",
            message: "The passwords do not match"
        }
    }

    const user = await findByEmail(body.email);
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
    
}