import {Provider} from "react-redux";
import {AppRootState, store} from "../../state/store";
import AppWithredux from "../../AppWithredux";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../state/app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,

})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "58:47", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "58:47", order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            { id: "1", title: "CSS", status: TaskStatuses.New, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId1", order: 0 ,addedDate: '', description: ''  },
            { id: "2", title: "JS", status: TaskStatuses.Completed, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId1", order: 0 ,addedDate: '' , description: ''  },
        ],
        ["todolistId2"]: [
            { id: "1", title: "Milk", status: TaskStatuses.New, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId2", order: 0 ,addedDate: '', description: ''   },
            { id: "2", title: "Bread", status: TaskStatuses.Completed, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId2", order: 0 ,addedDate: '', description: ''   },
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

