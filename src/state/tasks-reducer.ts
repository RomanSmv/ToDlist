import {TasksStateType} from "../AppWithredux";
import {v1} from "uuid";
import {AddToDoListType, RemoveToDoListType} from "./todolists-reducer";


export type removeTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string,

}
export type addTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string,
}

export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string,
    taskId: string,
    isDone: boolean
}
export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    taskId: string,
    title: string
}


type ActionType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType
    | AddToDoListType | RemoveToDoListType

const initialState: TasksStateType = {

    }


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            copyState[action.todolistId] = filteredTasks
            return copyState
            }
        case 'ADD-TASK': {
            const copyState = {...state}
            const tasks = state[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            copyState[action.todolistId]= newTasks

            return copyState
        }
            case 'CHANGE-TASK-STATUS': {
                const copyState = {...state}

                let tasks = state[action.todolistId];
                copyState[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)


                return copyState;
            }
        case 'CHANGE-TASK-TITLE': {
            const copyState = {...state}

            let title = state[action.todolistId];
            let changeTitle = title.find(t => t.id === action.taskId);

            if (changeTitle) {
                changeTitle.title = action.title;
            }

            return copyState;
        }
            case "ADD-TODOLIST": {
            const copyState = {...state}
            copyState[action.todolistId] = []

            return copyState

}
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskActionType  => {
    return {type: 'ADD-TASK', todolistId, title}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType  => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, isDone, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType  => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, title, taskId}
}
