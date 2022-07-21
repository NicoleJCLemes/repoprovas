import { Router } from "express";
import { authentication } from "../middlewares/authValidation.js";

const testRouter = Router();

testRouter.use(authentication);
testRouter.post("/test");
testRouter.get("/test/discipline");
testRouter.get("/test/teacher");

export default testRouter;