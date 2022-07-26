import { Request, Response } from "express";
import { getCategoriesService } from "../services/categoryService.js";

export async function getCategories(req: Request, res: Response) {

    const categories = await getCategoriesService();

    res.status(200).send(categories);
}