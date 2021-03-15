import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskSAC} from './tasks-reducer';

import {addToDoListAC, removeToDoListAC, setToDoListsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TasksTypeAPI} from "../api/todolist-api";

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId1", order: 0 ,addedDate: '', description: ''  },
            { id: "2", title: "JS", status: TaskStatuses.Completed, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId1", order: 0 ,addedDate: '' , description: ''  },
            { id: "3", title: "React", status: TaskStatuses.New, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId1", order: 0 ,addedDate: '', description: ''  }
        ],
        "todolistId2": [
            { id: "1", title: "Milk", status: TaskStatuses.New, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId2", order: 0 ,addedDate: '', description: ''   },
            { id: "2", title: "Bread", status: TaskStatuses.Completed, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId2", order: 0 ,addedDate: '', description: ''   },
            { id: "3", title: "Eags", status: TaskStatuses.New, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId2", order: 0 ,addedDate: '', description: ''   }
        ]
    }
})






test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("todolistId2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});


test('correct task should be added to correct array', () => {


    const action = addTaskAC({
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate:"",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "id exist"
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {


    const action = updateTaskSAC("2", {status: TaskStatuses.New}, "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);

});
test('title of specified task should be changed', () => {


    const action = updateTaskSAC("2", {title:"Twix"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Twix");
    expect(endState["todolistId1"][1].title).toBe("JS");

});


test('new array should be added when new todolist is added', () => {


    const action = addToDoListAC({
        addedDate:'',
        id: 'bla',
        order: 0,
        title: 'new todolist'
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {


    const action = removeToDoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('emply arrays should be when we set todolists', () => {


    const action = setToDoListsAC([
        {id: "1", title: "title 1", order: 0, addedDate: ""},
        {id: "2", title: "title 2", order: 0, addedDate: ""},
    ]);

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
});
