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
import {fetchTodolistsTC, ToDoListBusinessType} from "./state/todolists-reducer";


type PropsType = {
    todolist: ToDoListBusinessType
    changeFilter: (id: string, value: FilterValuesType) => void
    onRemoveToDoList: (todoListID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    demo?: boolean
}
//demo если не передали, то по умолчанию false
export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    console.log('called App');


    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))


    }, [])

    const tasks = useSelector<AppRootState, Array<TasksTypeAPI>>(state => state.tasks[props.todolist.id])
    const dispatch = useDispatch()


    const onRemoveToDoList = () => props.onRemoveToDoList(props.todolist.id);
    const changeTodoListTitle = useCallback((newTitle: string) => props.changeTodoListTitle(props.todolist.id, newTitle), [props.changeTodoListTitle, props.todolist.id]);


    const onAllClickHandler = useCallback(() => {
        debugger
        props.changeFilter(props.todolist.id, "all")
    }, [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "active"), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "completed"), [props.changeFilter, props.todolist.id]);

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const addTask = useCallback(function (title: string) {
        const thunk = addTaskTC(title, props.todolist.id)
        dispatch(thunk)
    }, [dispatch])

    return <div>
        <h3><EditableSpan title={props.todolist.title} onChange={changeTodoListTitle}/>
            <IconButton onClick={onRemoveToDoList} disabled={props.todolist.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
        <ul>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}/>)
            }
        </ul>
        <div>
            <Button
                variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={"primary"}
            >All
            </Button>
            <Button
                variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})




