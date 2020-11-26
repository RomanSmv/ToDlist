import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return editMode
        ? <TextField variant="outlined" value={title} onChange={onChangeTitleHandler} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>


})

