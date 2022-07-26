import prisma from "../config/database.js";

export async function getAll() {
    const categories = await prisma.categories.findMany();
    return categories;
}