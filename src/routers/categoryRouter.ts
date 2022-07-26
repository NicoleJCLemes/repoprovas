import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";
import { authentication } from "../middlewares/authValidation.js";

const categoryRouter = Router();

categoryRouter.get("/categories", authentication, getCategories);

export default categoryRouter;