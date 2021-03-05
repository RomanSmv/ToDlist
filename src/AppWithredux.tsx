import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    changeFilterToDoListAC,
    changeTitleTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
    ToDoListBusinessType,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ErrorSnackbar} from "./ErrorSneckbar/Errorsneckbar";


export type FilterValuesType = "all" | "active" | "completed";


const AppWithredux = React.memo(() => {
    console.log('called App')

    useEffect(() => {

        dispatch(fetchTodolistsTC())


    }, [])

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, Array<ToDoListBusinessType>>(state => state.todolists)


    const onRemoveToDoList = useCallback((todoListId: string) => {
        const thunk = removeTodolistTC(todoListId)
        dispatch(thunk)

    }, [dispatch])


    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTitleTodolistTC(id, newTitle))

    }, [dispatch])


    const changeFilter = useCallback((id: string, value: FilterValuesType) => {
        dispatch(changeFilterToDoListAC(id, value))


    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistTC(title)
        dispatch(action)

    }, [dispatch])



    return (
        <div className="App">
            <ErrorSnackbar />
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
                <LinearProgress />
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
