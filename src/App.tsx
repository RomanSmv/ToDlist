import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ErrorSnackbar} from "./ErrorSneckbar/Errorsneckbar";
import {initializeAppTC, ValuesStatusType} from "./state/app-reducer";
import {TodolistsList} from "./TodolistsList";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./features/Login/login";
import {logoutTC} from "./features/Login/auth-reducer";


type PropsType = {
    demo?: boolean
}

const App = React.memo(({demo = false}: PropsType) => {
        const status = useSelector<AppRootState, ValuesStatusType>((state => state.app.status))
        const isInitialized = useSelector<AppRootState, boolean>((state => state.app.isInitialized))
        const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

        const logoutHandler = useCallback(() => {
            dispatch(logoutTC())
        }, [])


        const dispatch = useDispatch()


//сработает только 1 раз, поменяет isLoggedIn на true и поэтому перерисуется с крутилки на приложение
        useEffect(() => {
            if (!demo) {
                dispatch(initializeAppTC())
            }
        }, [])

        //если еще не инициализировалось(не успело отправить get me залогинен ли юзер), то показывать крутилку
        if (!isInitialized) {
            return <div
                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        }



    return (
                <div className="App">
                    <ErrorSnackbar/>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6">
                                News
                            </Typography>
                            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                        </Toolbar>
                        {status === 'loading' && <LinearProgress/>}
                    </AppBar>
                    <Container fixed>
                        <Switch>
                            <Route exact path={"/"} render={() => < TodolistsList demo={demo}/>}/>
                            <Route path={"/login"} render={() => < Login/>}/>
                            <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                            <Redirect from={'*'} to={'/404'}/>
                        </Switch>
                    </Container>
                </div>
        )
    }
)

export const App1 = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)


export default App;
