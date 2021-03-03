import React from 'react';
import {AddItemForm} from './AddItemForm';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";

export default {
    title: 'Task Stories',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

const onChangeStatusHandler = action ("1")


export const TaskExample = () => {
    return <>
        <Task
            task={{ id: "1", title: "CSS", status: TaskStatuses.New, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId1", order: 0 ,addedDate: '', description: ''  }}
            todolistId={"todolistId1"}
        />
        <Task
            task={{ id: "2", title: "JS", status: TaskStatuses.Completed, priority: TaskPriorities.Middle, startDate: '', deadline: '',
                todoListId: "todolistId1", order: 0 ,addedDate: '' , description: ''  }}
            todolistId={"todolistId2"}
        />
    </>

}