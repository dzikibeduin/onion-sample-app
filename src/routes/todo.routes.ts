import { TodoService } from "services";
import { Router, Response, Request, NextFunction } from "express";
import HttpException from "../exceptions/http.exception";
import validate from "../validations/todo.validation";
import validationMiddleware from "../middleware/validation.middleware";

export const TodoRouter = (router: Router, service: TodoService): void => {

    router.route('/').get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await service.GetTodos();

            res.status(200).send({ "results": data });
        } catch (e) {
            next(new HttpException(400, (e as string)));
        }
    });

   router.route('/:id').get(validationMiddleware(validate.getOneTodo), async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: number = parseInt(req.params.id);
            const data = await service.GetTodo(id);

            res.status(200).send({ "result": data });
        } catch (e: unknown) {
            next(new HttpException(400, (e as string)));
        }
    });

    router.route('/').post(validationMiddleware(validate.create), async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, description } = req.body;
            const authorId = 1;
            
            const result = await service.CreateTodo({ title, description, authorId });

            res.status(200).send({ "result": result });
        } catch (e: unknown) {
            next(new HttpException(400, (e as string)));
        }
    });

    router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, description } = req.body;
            const id = parseInt(req.params.id);
            const authorId = 1;

            const result = await service.UpdateTodo({ title, description, authorId }, id);

            res.status(200).send({ "result": result });
        } catch (e: unknown) {
            next(new HttpException(400, (e as string)));
        }
    });

    router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            await service.DeleteTodo(id);
            
            res.sendStatus(200);
        } catch (e: unknown) {
            next(new HttpException(400, (e as string)));
        }
    });
}