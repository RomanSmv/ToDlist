import {useDispatch} from "react-redux";
import {deleteTasksTC, updateTaskTC} from "./state/tasks-reducer";
import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TasksTypeAPI} from "./api/todolist-api";

type TasksPropsType = {
    task: TasksTypeAPI
    todolistId: string
}


export const Task = React.memo((props: TasksPropsType) => {
    const dispatch = useDispatch()


    /*  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
          let newIsDoneValue = e.currentTarget.checked
          dispatch(changeTaskStatusTC(props.task.id, newIsDoneValue, props.todolistId))
      }*/
    const onChangeStatusHandler =useCallback( (e) => {
        const newStatusValue = e.currentTarget.checked
            dispatch(updateTaskTC(props.task.id, {status: newStatusValue ? TaskStatuses.Completed : TaskStatuses.InProgress}, props.todolistId))
    },[dispatch,props.task.id,  props.task.status, props.todolistId])
    const onChangeTitleHandler = useCallback( (title: string) => {
        debugger
        dispatch(updateTaskTC(props.task.id, {title: title}, props.todolistId));
    },[dispatch,props.task.id, props.todolistId])

    const removeTask = useCallback(() => {
        const action = deleteTasksTC(props.todolistId, props.task.id)
        dispatch(action)
    }, [dispatch, props.todolistId, props.task.id])


    return <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox color="primary"
                  onChange={onChangeStatusHandler}
                  checked={props.task.status === TaskStatuses.Completed}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>

        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </li>
})