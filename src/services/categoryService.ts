import { getAll } from "../repositories/categoryRepository.js";

export async function getCategoriesService() {
    const categories = await getAll()
    return categories;
}