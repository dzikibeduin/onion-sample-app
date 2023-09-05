import express, { Router, Application } from "express";
import dotenv from "dotenv";

import { Todo } from "./data_access";
import { TodoService } from "./services";
import { TodoRouter } from "./routes/todo.routes";
import errorMiddleware from "./middleware/error.middleware";

dotenv.config();

class App {
    public express: Application;
    public port: number;
    private router: Router;

    constructor(port: number) {
        this.express = express();
        this.port = port;
        this.router = Router();

        this.initializeRoutes();
        this.initializeMiddlewares();
        this.initializeErrorHandling();
    }

    private initializeRoutes(): void {
        TodoRouter(this.router, new TodoService(new Todo));
    }

    private initializeMiddlewares(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use('/', this.router);
    }

    private initializeErrorHandling(): void {
        this.router.use(errorMiddleware);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log('app listening on port from port from env file, fuck it!');
        });
    }
    
}

export default App;