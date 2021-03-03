import {FilterValuesType} from "../AppWithredux";
import {todolistAPI, TodolistTypeAPI} from "../api/todolist-api";
import {Dispatch} from "redux";


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
type ActionType =
    RemoveToDoListType
    | AddToDoListType
    | ChangeTitleToDoListType
    | ChangeFilterToDoListType
    | SetTodolistsActionType

const initialState: Array<ToDoListBusinessType> = []
export type ToDoListBusinessType = TodolistTypeAPI & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<ToDoListBusinessType> = initialState, action: ActionType): Array<ToDoListBusinessType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':{
            const newTodolist: ToDoListBusinessType = {...action.todolist, filter : "all"}
            return (
                [
                    newTodolist,
                    ...state

                ]

            )}
        case 'CHANGE-TODOLIST-TITLE':

            let todolistTitle = state.find(t => t.id === action.id);

            if (todolistTitle) {
                todolistTitle.title = action.title;

            }
            return [...state]

        case 'CHANGE-TODOLIST-FILTER':
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]

        case 'SET-TODOLISTS': {
            return action.todolists.map(todolist => ({
                ...todolist,
                filter: 'all'
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
//ne ponimat zachem lists peredavat
export const setToDoListsAC = (todolists: Array<TodolistTypeAPI>): SetTodolistsActionType => {
    return {type: "SET-TODOLISTS", todolists: todolists}
}
export const fetchTodolistsTC = () => {
return (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setToDoListsAC(res.data))
        })
}
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {

                dispatch(removeToDoListAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addToDoListAC(res.data.data.item))
            })
    }
}
export const changeTitleTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist( id, title)
            .then((res) => {

                dispatch(changeTitleToDoListAC(id, title))
            })
    }
}
