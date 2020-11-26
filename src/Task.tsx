import {TasksType} from "./AppWithredux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TasksPropsType = {
    task: TasksType
    todolistId: string
}


export const Task = React.memo((props: TasksPropsType) => {

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId))

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId))

    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },[props.task.id, props.todolistId])

    return <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox color="primary"
                  onChange={onChangeStatusHandler}
                  checked={props.task.isDone}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>

        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
})