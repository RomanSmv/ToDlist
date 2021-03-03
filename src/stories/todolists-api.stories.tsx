import React, {useEffect, useState} from 'react'
import {tasksAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist().then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4970d33a-eca7-4aef-a2c4-36b86679c7d9'
        tasksAPI.getTasks(todolistId).then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist(  "newTodolistppppzz").then( (res) => {
            setState(res.data);
        } )
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    useEffect(() => {
        const todolistId = '6d0291ad-8674-4caa-aa8e-a8608b17b3e8'
        tasksAPI.createTask(todolistId,  "newTaskssssssppppzz").then( (res) => {
            setState(res.data);
        } )
    }, [])
    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={"todolistId"} value={todolistId}
        onChange={(e)=> {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={"Task Title"} value={taskTitle}
               onChange={(e)=> {setTaskTitle(e.currentTarget.value)}}/>
               <button onClick={CreateTasks}>create task</button>
    </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '10e9be99-f7a5-455d-9e4b-c3b697e1db1b';
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6d0291ad-8674-4caa-aa8e-a8608b17b3e8'
        const taskId = `da245c3e-ee93-49b8-bb02-d821a614ef87`
        tasksAPI.deleteTask(todolistId, taskId).then( (res) => {
            setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4970d33a-eca7-4aef-a2c4-36b86679c7d9'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                debugger;
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '10e9be99-f7a5-455d-9e4b-c3b697e1db1b'
        const taskId = `09c28ca5-d537-4b49-bcdc-9b915486d3ec`
        const model = {
            title:"string",
            description: "string",
            status: 1,
            priority: 1,
            startDate: "string",
            deadline: "string"
        }
        tasksAPI.updateTask(todolistId, taskId, model).then( (res) => {
            setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


