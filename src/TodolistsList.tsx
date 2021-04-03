import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {
    addTodolistTC,
    changeFilterToDoListAC,
    changeTitleTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
    ToDoListBusinessType
} from "./state/todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "./AddItemForm";
import {Todolist} from "./Todolist";
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}
export type FilterValuesType = "all" | "active" | "completed";
export const TodolistsList: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()


    const todoLists = useSelector<AppRootState, Array<ToDoListBusinessType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)


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

    useEffect(() => {
        //убираем из storybook работу с сервером (после ретурна код не выполняется)
        //а также не посылаем запрос на серв когда чел не залогинен
        if (props.demo || !isLoggedIn) return
        //самая первая загрузка листов
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    //если не залогинен и находишься на странице тудулистов, то редирект на логин
    //делаем в самом конце, чтобы хуки выше не попадали под else(хуки нельзя в условиях и циклах)
    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
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
                                        todolist={tl}
                                        key={tl.id}
                                        changeFilter={changeFilter}
                                        onRemoveToDoList={onRemoveToDoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                        demo={props.demo}
                                    />
                                </Paper>
                            </Grid>
                        )

                    })

                }
            </Grid>

        </>
    )
}