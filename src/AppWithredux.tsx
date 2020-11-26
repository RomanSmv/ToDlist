import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addToDoListAC,
    changeFilterToDoListAC,
    changeTitleToDoListAC,
    removeToDoListAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {

    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksType = {

    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

const AppWithredux = React.memo(() => {
console.log('called App')

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)


    const onRemoveToDoList = useCallback((todoListID: string) => {

        dispatch(removeToDoListAC(todoListID))

    }, [dispatch])


    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTitleToDoListAC(id, newTitle))

    }, [dispatch])


    const changeFilter = useCallback((id: string, value: FilterValuesType) => {
        dispatch(changeFilterToDoListAC(id, value))


    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addToDoListAC(title)
        dispatch(action)

    }, [dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>


                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {


                            return (
                                <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            changeFilter={changeFilter}
                                            filter={tl.filter}
                                            onRemoveToDoList={onRemoveToDoList}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )

                        })

                    }
                </Grid>
            </Container>
        </div>)
})

export default AppWithredux;
