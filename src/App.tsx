import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {

    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoListID1, title: "Books", filter: "all"},
            {id: todoListID2, title: "Xyuks", filter: "active"}
        ]
    )

    let onRemoveToDoList = (todoListID: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(filteredTodoList)
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todolist = todoLists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    let [tasks, setTasks] = useState({
            [todoListID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
            ],

            [todoListID2]: [
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    );




    function removeTask(id: string, todoListID: string) {
        let todoListsTasks = tasks[todoListID]
        tasks[todoListID] = todoListsTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskId);

        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }
    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskId);

        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }


    }

    function changeFilter(id: string, value: FilterValuesType) {
        let todoList = todoLists.find(tl => tl.id === id);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function addTodoList(title: string) {
        let newTodoListId = v1()
        let newTodoList: TodoListType = {id: newTodoListId, title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }



    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodoList} />
                </Grid>



            <Grid container spacing={3}>
            {
                todoLists.map(tl => {
                let allTasks = tasks[tl.id];
                let tasksForTodolist = allTasks;

                if (tl.filter === "active") {
                    tasksForTodolist = allTasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTasks.filter(t => t.isDone === true);
                }

                return (
                    <Grid item>
                        <Paper style={{padding: "10px"}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
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
}

export default App;
