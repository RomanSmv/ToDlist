import {todolistAPI, TodolistTypeAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, ValuesStatusType} from "./app-reducer";
import {FilterValuesType} from "../TodolistsList";
import {handleServerNetworkError} from "../Utils/Erroe-Utils";


export type RemoveToDoListType = {
    type: 'REMOVE-TODOLIST',
    id: string,

}
/*export type AddToDoListType = {
    type: 'ADD-TODOLIST',
    todolistId: string
    title: string,

}*///мы создаем тип автоматически ReturnType<typeof addToDoListAC>
export type ChangeTitleToDoListType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string,

}
export type ChangeFilterToDoListType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todolists: Array<TodolistTypeAPI>
}
export type AddToDoListType = ReturnType<typeof addToDoListAC>
export type TodolistEntityStatusType =ReturnType<typeof changeEntityStatusToDoListAC>
type ActionType =
    RemoveToDoListType
    | AddToDoListType
    | ChangeTitleToDoListType
    | ChangeFilterToDoListType
    | SetTodolistsActionType
    | TodolistEntityStatusType

const initialState: Array<ToDoListBusinessType> = []
export type ToDoListBusinessType = TodolistTypeAPI & {
    filter: FilterValuesType,
    entityStatus: ValuesStatusType
}

export const todolistsReducer = (state: Array<ToDoListBusinessType> = initialState, action: ActionType): Array<ToDoListBusinessType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST': {
            const newTodolist: ToDoListBusinessType = {...action.todolist, filter: "all", entityStatus: "idle"}
            return (
                [
                    newTodolist,
                    ...state

                ]

            )
        }
        case 'CHANGE-TODOLIST-TITLE':

            let todolistTitle = state.find(t => t.id === action.id);

            if (todolistTitle) {
                todolistTitle.title = action.title;

            }
            return [...state]

        case 'CHANGE-TODOLIST-FILTER':
            let todoListFilter = state.find(tl => tl.id === action.id);
            if (todoListFilter) {
                todoListFilter.filter = action.filter;
            }
            return [...state]

        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.entityStatus = action.status;
            }
            return [...state]
        case 'SET-TODOLISTS': {
            return action.todolists.map(todolist => ({
                ...todolist,
                filter: 'all',
                entityStatus: "idle"
            }))
        }


        default:
            return state
    }
}

export const removeToDoListAC = (todolistId: string): RemoveToDoListType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addToDoListAC = (todolist: TodolistTypeAPI) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTitleToDoListAC = (id: string, title: string): ChangeTitleToDoListType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeFilterToDoListAC = (id: string, filter: FilterValuesType): ChangeFilterToDoListType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const changeEntityStatusToDoListAC = (id: string, status: ValuesStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id: id, status: status} as const
}
//ne ponimat zachem lists peredavat
export const setToDoListsAC = (todolists: Array<TodolistTypeAPI>): SetTodolistsActionType => {
    return {type: "SET-TODOLISTS", todolists: todolists}
}
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setToDoListsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        //показать полоску загрузки
        dispatch(setAppStatusAC('loading'))
            //задизэйблить тудулист
        dispatch(changeEntityStatusToDoListAC(todolistId,'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {

                dispatch(removeToDoListAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addToDoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const changeTitleTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(id, title)
            .then((res) => {

                dispatch(changeTitleToDoListAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
