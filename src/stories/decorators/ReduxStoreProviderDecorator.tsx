import {Provider} from "react-redux";
import {AppRootState} from "../../state/store";
import React from "react";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../state/app-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",entityStatus: "idle" ,addedDate: "58:47", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "idle" ,addedDate: "58:47", order: 0}
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
    },
    app: {
        status: 'idle',
        error: null
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

