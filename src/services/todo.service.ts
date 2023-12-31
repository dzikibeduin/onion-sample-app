import { Todo } from "data_access";
import { TodoInterface } from "../interfaces/todo.interface";

export class TodoService {
    constructor(private todo: Todo) {}

    public async GetTodos() {
        try {
            const data = await this.todo.GetTodos();
            return data;
        } catch (e) {
            throw e;
        }
    }

    public async GetTodo(id: number) {
        try {
            const data = await this.todo.GetTodo(id);
            return data;
        } catch (e) {
            throw e;
        }
    }

    public async CreateTodo(data: TodoInterface) {
        try {
            const result = await this.todo.CreateTodo(data);
            return result;
        } catch (e) {
            throw e;
        }
    }

    public async UpdateTodo(data: TodoInterface, id: number) {
        try {
            const result = await this.todo.UpdateTodo(data, id);
            return result;
        } catch (e) {
            throw e;
        }
    }

    public async DeleteTodo(id: number) {
        try {
            const result = await this.todo.DeleteTodo(id);
            return result;
        } catch (e) {
            throw e;
        }
    }
}