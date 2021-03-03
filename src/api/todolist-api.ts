import axios from 'axios'
import {UpDateAPITaskType} from "../state/tasks-reducer";
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '2c8164cb-8938-4b6c-9f69-8a7ff54d8100'
    }
})
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise
    },
    createTodolist( title: string) {
        const promise = instance.post<ResponseType<{item: TodolistTypeAPI}>>(`todo-lists`, {title: title})
        return promise
    },
    getTodolist() {
        const promise = instance.get<Array<TodolistTypeAPI>>(`todo-lists`)
        return promise
    }
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponce>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, taskTitle: string) {
        const promise = instance.post<ResponseType<{item: TasksTypeAPI }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, )
        return promise
    },
    updateTask(todolistId: string, taskId: string, model: UpDateAPITaskType) {
        const promise = instance.put<ResponseType<TasksTypeAPI>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    },

}
export type TodolistTypeAPI= {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type GetTasksResponce = {
    error: string | null
    totalCount: number
    items: TasksTypeAPI[]
}
export type TasksTypeAPI = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate:string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    draft = 3
}

export enum TaskPriorities {
    Low= 0,
    Middle = 1,
    High = 2 ,
    Urgently= 3,
    Later = 4
}