import {AddToDoListType, RemoveToDoListType, SetTodolistsActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskPriorities, tasksAPI, TaskStatuses, TasksTypeAPI} from "../api/todolist-api";
import {AppRootState} from "./store";


export type removeTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string,

}
export type addTaskActionType = {
    type: 'ADD-TASK',
    task: TasksTypeAPI
}

export type changeTaskStatusActionType = {
    type: 'UPDATE-TASK',
    todolistId: string,
    taskId: string,
    model: UpDateAPITaskType
}
export type updateTaskActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    taskId: string,
    title: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TasksTypeAPI>
    todolistId: string
}

export type TasksStateType = {
    [key: string]: Array<TasksTypeAPI>
}


type ActionType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType | updateTaskActionType
    | AddToDoListType | RemoveToDoListType | SetTodolistsActionType | SetTasksActionType

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = {...state}
            const tasks = state[action.todolistId]
            debugger
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            copyState[action.todolistId] = filteredTasks
            return copyState
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }

        case 'UPDATE-TASK': {
            let copystate = {...state}
            let tasks = state[action.todolistId]

            let newTasksArray = tasks.map(task => {

                return task.id === action.taskId ? {...task, ...action.model} : task
            })
            copystate[action.todolistId] = newTasksArray
            return copystate;
            /*return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            }*/
        }
        /* case 'CHANGE-TASK-TITLE': {
             const copyState = {...state}

             let title = state[action.todolistId];
             let changeTitle = title.find(t => t.id === action.taskId);

             if (changeTitle) {
                 changeTitle.title = action.title;
             }

             return copyState;
         }*/
        case "ADD-TODOLIST": {
            const copyState = {...state}
            copyState[action.todolist.id] = []
            return copyState
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }


        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (task: TasksTypeAPI): addTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskSAC = (taskId: string, model: UpDateAPITaskType, todolistId: string): changeTaskStatusActionType => {
    return {type: 'UPDATE-TASK', todolistId, model, taskId}
}
/*export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): updateTaskActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, title, taskId}
}*/
export const setTasksAC = (tasks: Array<TasksTypeAPI>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}
export const deleteTasksTC = (todolistId: string, taskId: string,) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {

                const action = removeTaskAC(todolistId, taskId)
                dispatch(action)
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}

/*
export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const state = getState()
        const task = state.tasks[todolistId].find(task => task.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return
        }
        const model: UpDateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: status
        }
        tasksAPI.updateTask(todolistId, taskId, model)
            .then((res) => {

                const action = updateTaskSAC(taskId, status, todolistId)
                dispatch(action)
            })
    }
}
*/
export type UpDateAPITaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (taskId: string, domainModel: UpDateAPITaskType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва
        debugger
        const state = getState()
        const task = state.tasks[todolistId].find(task => task.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return
        }
        //эта моделька улетает на сервер
        const serverModel: UpDateAPITaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            //может быть только одно свойство и мы его берем
            ...domainModel
        }
        tasksAPI.updateTask(todolistId, taskId, serverModel)
            .then((res) => {

                const action = updateTaskSAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }
}
