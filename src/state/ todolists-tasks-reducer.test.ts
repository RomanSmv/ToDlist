import {} from "../AppWithredux";
import {addToDoListAC, ToDoListBusinessType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TasksTypeAPI, TodolistTypeAPI} from "../api/todolist-api";



test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListBusinessType> = [];

    let todolist: TodolistTypeAPI = {
        title: "new todolist",
        id: 'any id',
        addedDate: '',
        order: 0
    };


    const action = addToDoListAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
