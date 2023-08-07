import express, { Router } from "express";
import dotenv from "dotenv";

import { Todo } from "./data_access";
import { TodoService } from "./services";
import { TodoRouter } from "./routes/todo.routes";

dotenv.config();

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

TodoRouter(router, new TodoService(new Todo));

app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`);
});