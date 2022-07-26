import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";
import { authentication } from "../middlewares/authValidation.js";
var categoryRouter = Router();
categoryRouter.use(authentication);
categoryRouter.get("/categories", getCategories);
export default categoryRouter;
