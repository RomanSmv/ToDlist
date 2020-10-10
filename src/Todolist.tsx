import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (id: string, value: FilterValuesType) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    filter: FilterValuesType
    onRemoveToDoList: (todoListID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const onRemoveToDoList = () => props.onRemoveToDoList(props.id);
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(props.id, newTitle);

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle} />

            <IconButton onClick={onRemoveToDoList}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox color="primary"
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleHandler}/>

                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={"primary"}
            >All
            </Button>
            <Button
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
