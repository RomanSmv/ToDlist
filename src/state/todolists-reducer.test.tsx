import {
    addToDoListAC, changeEntityStatusToDoListAC,
    changeFilterToDoListAC,
    changeTitleToDoListAC,
    removeToDoListAC, setToDoListsAC, ToDoListBusinessType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from "../AppWithredux";
import {TodolistTypeAPI} from "../api/todolist-api";
import {ValuesStatusType} from "./app-reducer";


let todolistId1: string
let todolistId2: string
let startState: Array<ToDoListBusinessType>

beforeEach(() => {
     todolistId1 = v1();
     todolistId2 = v1();

     startState = [
        {id: todolistId1, title: "What to learn", filter: "all",entityStatus: "idle", addedDate: "58:47", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "58:47", order: 0}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState,  removeToDoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let todolist: TodolistTypeAPI = {
        title: "New Todolist",
        id: 'any id',
        addedDate: '',
        order: 0
    };

    const endState = todolistsReducer(startState, addToDoListAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
});


test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";


    const action = changeTitleToDoListAC( todolistId2, newTodolistTitle)
    ;

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const action = changeFilterToDoListAC(todolistId2, newFilter );
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct filter of todolist should be changed', () => {
    let newStatus: ValuesStatusType = "loading";
    const action = changeEntityStatusToDoListAC(todolistId2, newStatus );
    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});


test(' todolist should be set to the state', () => {


    const action = setToDoListsAC( startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe( 2);
});

