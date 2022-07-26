import { Router } from "express";
import { authentication } from "../middlewares/authValidation.js";
import * as testController from "../controllers/testController.js";
import { schemasValidation } from "../middlewares/schemasValidation.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/tests", authentication, schemasValidation(testSchema), testController.postTest);
testRouter.get("/tests", authentication, testController.getTests);

export default testRouter;