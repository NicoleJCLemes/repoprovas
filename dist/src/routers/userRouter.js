import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { schemasValidation } from "../middlewares/schemasValidation.js";
import { signInSchema, signUpSchema } from "../schemas/userSchema.js";
var userRouter = Router();
userRouter.post("/sign-up", schemasValidation(signUpSchema), userController.signUp);
userRouter.post("/sign-in", schemasValidation(signInSchema), userController.signIn);
export default userRouter;
