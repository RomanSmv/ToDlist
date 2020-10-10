import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveToDoListType = {
    type: 'REMOVE-TODOLIST',
    id: string,

}
export type AddToDoListType = {
    type: 'ADD-TODOLIST',

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


export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return (
                [...state, {
                    id: v1(),
                    title: action.title,
                    filter: "all"
                }

                ]

            )
        case 'CHANGE-TODOLIST-TITLE':

            let todolisttitle = state.find(t => t.id === action.id);

            if (todolisttitle) {
                todolisttitle.title = action.title;

            }
            return [...state]

        case 'CHANGE-TODOLIST-FILTER':
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveToDoListAC = (todolistId: string): RemoveToDoListType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddToDoListAC = (title: string): AddToDoListType => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTitleToDoListAC = (id: string, title: string): ChangeTitleToDoListType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const ChangeFilterToDoListAC = ( id: string, filter: FilterValuesType): ChangeFilterToDoListType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}