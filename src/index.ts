import express, {json} from "express";
import "express-async-errors";
import cors from "cors";
import "./config/setup.js";
import router from "./routers/index.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

const PORT: number = +process.env.PORT || 5000 
app.listen(PORT, () => console.log("The server is running on port " + PORT));