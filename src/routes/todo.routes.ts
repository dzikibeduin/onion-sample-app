import { TodoService } from "services";
import { Router, Response, Request } from "express";

export const TodoRouter = (router: Router, service: TodoService): void => {
    router.get('/', async (req: Request, res: Response) => {
        try {
            const data = await service.GetTodos();

            res.status(200).send({ "results": data });
        } catch (e) {
            res.status(400).send({ "error": e });
        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const id: number = parseInt(req.params.id);
            const data = await service.GetTodo(id);

            res.status(200).send({ "result": data });
        } catch (e) {
            res.status(400).send({ "error": e });
        }
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const { title, description } = req.body;
            const authorId = 1;
            
            const result = await service.CreateTodo({ title, description, authorId });

            res.status(200).send({ "result": result });
        } catch (e) {
            res.status(400).send({ "error": e });
        }
    });

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const { title, description } = req.body;
            const id: number = parseInt(req.params.id);
            const authorId = 1;

            const result = await service.UpdateTodo({ title, description, authorId }, id);

            res.status(200).send({ "result": result });
        } catch (e) {
            res.status(400).send({ "error": e });
        }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const id: number = parseInt(req.params.id);
            await service.DeleteTodo(id);
            
            res.sendStatus(200);
        } catch (e) {
            res.status(400).send({ "error": e });
        }
    });
}