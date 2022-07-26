import { NextFunction, Request, Response } from "express";
import "../config/setup.js";
import jwt from "jsonwebtoken";
import { findByUserId } from "../services/userService.js";

export async function authentication(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    if (!authorization) {
        throw {
            type: "Unauthorized",
            message: "Authorization header invalid or inexistent"
        }
    }

    const token = authorization.replace("Bearer ", "").trim();
    if (!token) {
        throw {
            type: "Unauthorized",
            message: "Token inexistent"
        }
    }

    try {

        const secretKey = process.env.SECRET_KEY;
        const { userId } = jwt.verify(token, secretKey) as {userId: number};
        const user = await findByUserId(userId);
        res.locals.user = user;

        next();

    } catch (error) {
        throw {
            type:"Unauthorized",
            message: "Token invalid"
        }
    }

    next();
}