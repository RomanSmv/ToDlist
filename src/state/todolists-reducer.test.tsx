import {
    addToDoListAC,
    changeFilterToDoListAC,
    changeTitleToDoListAC,
    removeToDoListAC, setToDoListsAC, ToDoListBusinessType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from "../AppWithredux";
import {TodolistTypeAPI} from "../api/todolist-api";


let todolistId1: string
let todolistId2: string
let startState: Array<ToDoListBusinessType>

beforeEach(() => {
     todolistId1 = v1();
     todolistId2 = v1();

     startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "58:47", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "58:47", order: 0}
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
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<ToDoListBusinessType> = [
        {id: todolistId1, title: "What to learn", filter: "all",addedDate: "58:47", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",addedDate: "58:47", order: 0}
    ]

    const action = changeTitleToDoListAC( todolistId2, newTodolistTitle)
    ;

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<ToDoListBusinessType> = [
        {id: todolistId1, title: "What to learn", filter: "all",addedDate: "58:47", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",addedDate: "58:47", order: 0}
    ]

    const action = changeFilterToDoListAC(todolistId2, newFilter );

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test(' todolist should be set to the state', () => {


    const action = setToDoListsAC( startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe( 2);
});

