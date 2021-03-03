import React, {useCallback, useEffect} from 'react';
import {FilterValuesType} from './AppWithredux';
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {addTaskActionType, addTaskTC, fetchTasksTC} from "./state/tasks-reducer";
import {AppRootState} from "./state/store";
import {Task} from "./Task";
import {TaskStatuses, TasksTypeAPI} from "./api/todolist-api";
import {fetchTodolistsTC} from "./state/todolists-reducer";


type PropsType = {
    id: string,
    title: string
    changeFilter: (id: string, value: FilterValuesType) => void
    filter: FilterValuesType
    onRemoveToDoList: (todoListID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('called App');
    useEffect(() => {

        dispatch(fetchTasksTC(props.id))


    }, [])

    const tasks = useSelector<AppRootState, Array<TasksTypeAPI>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    const onRemoveToDoList = () => props.onRemoveToDoList(props.id);
    const changeTodoListTitle = useCallback((newTitle: string) => props.changeTodoListTitle(props.id, newTitle), [props.changeTodoListTitle, props.id]);


    const onAllClickHandler = useCallback(() => {
        debugger
        props.changeFilter(props.id, "all")
    }, [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, "active"), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, "completed"), [props.changeFilter, props.id]);

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const addTask = useCallback(function (title: string) {
        const thunk = addTaskTC( title, props.id)
        dispatch(thunk)
    }, [dispatch])

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>

            <IconButton onClick={onRemoveToDoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}/>)
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
})




