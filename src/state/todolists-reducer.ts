import {FilterValuesType, TodoListType} from "../AppWithredux";
import {v1} from "uuid";


export type RemoveToDoListType = {
    type: 'REMOVE-TODOLIST',
    id: string,

}
export type AddToDoListType = {
    type: 'ADD-TODOLIST',
    todolistId: string
    title: string,


}
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

type ActionType = RemoveToDoListType | AddToDoListType | ChangeTitleToDoListType | ChangeFilterToDoListType

const initialState: Array<TodoListType> = [

]




export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return (
                [ {
                    id: action.todolistId,
                    title: action.title,
                    filter: "all"
                },...state

                ]

            )
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

        default:
            return state
    }
}

export const removeToDoListAC = (todolistId: string): RemoveToDoListType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addToDoListAC = (title: string): AddToDoListType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTitleToDoListAC = (id: string, title: string): ChangeTitleToDoListType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeFilterToDoListAC = (id: string, filter: FilterValuesType): ChangeFilterToDoListType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}