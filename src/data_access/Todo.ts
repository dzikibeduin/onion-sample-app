import { PrismaClient } from "@prisma/client";
import { TodoInterface } from "types/types";

const prisma = new PrismaClient();

class Todo {
    public async GetTodos() {
        try {
           const data = await prisma.todo.findMany({});
           return data; 
        } catch (e) {
            throw e;
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
            throw e;
        }
    }

    public async CreateTodo(data: TodoInterface) {
        try {
            const result = await prisma.todo.create({
                data: data
            });
            return result;
        } catch (e) {
            throw e;
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
            throw e;
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
            throw e;
        }
    }
}

export { Todo }