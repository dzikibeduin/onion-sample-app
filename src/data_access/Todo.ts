import { $Enums, Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TodoInterface } from "types/types";

const prisma = new PrismaClient();

interface TodoInterfaceResult {
    id: number;
    title: string;
    description: string | null;
    authorId: number;
    resolverId: number | null;
    createdAt: Date;
    status: $Enums.TodoStatus;
}

export class Todo {
    public async GetTodos() {
        try {
           const data = await prisma.todo.findMany({});
           return data; 
        } catch (e) {
            throw JSON.stringify((e as PrismaClientKnownRequestError).message);
        }
    }

    public async GetTodo(id: number) {
        try {
            const data = await prisma.todo.findUnique({
                where: {
                    id: id
                }
            });
            return data;
        } catch (e) {
            throw JSON.stringify((e as PrismaClientKnownRequestError).message);
        }
    }

    public async CreateTodo(data: TodoInterface): Promise<TodoInterfaceResult> {
        try {
            const result = await prisma.todo.create({
                data: {
                    title: data.title,
                    description: data.description,
                    author: {
                        connect: {
                            id: data.authorId
                            
                        }
                    }
                }
            });
            
            return result;
        } catch (e: unknown) {
            console.log((e as PrismaClientKnownRequestError).message);
            throw (e as PrismaClientKnownRequestError).message;
        }
    }

    public async UpdateTodo(data: TodoInterface, id: number) {
        try {
            const result = await prisma.todo.update({
                where: {
                    id: id
                },
                data: data
            });
            return result;
        } catch (e) {
            throw JSON.stringify((e as PrismaClientKnownRequestError).message);
        }
    }

    public async DeleteTodo(id: number) {
        try {
            const result = await prisma.todo.delete({
                where: {
                    id: id
                }
            });
            return result;
        } catch (e) {
            throw JSON.stringify((e as PrismaClientKnownRequestError).message);
        }
    }
}