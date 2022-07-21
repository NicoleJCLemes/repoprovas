import { Request, Response } from "express";
import { signUpService, signInService } from "../services/userService.js";

export async function signUp(req: Request, res: Response) {
    const body = req.body;

    await signUpService(body);

    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const body = req.body;

    const token = await signInService(body);

    res.status(200).send(token);
}
