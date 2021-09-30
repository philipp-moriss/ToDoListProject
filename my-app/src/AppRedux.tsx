import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskAC, changeStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./state/tasks.reducer";
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    ToDoListsReducer
} from "./state/to-do-lists-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppRedux() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(ToDoListsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    const removeTask= React.useCallback((id: string, todolistId: string)=> {
        dispatchTasks(deleteTaskAC(id,todolistId))
    },[])

    const addTask = React.useCallback((title: string, todolistId: string)=> {
        dispatchTasks(addTaskAC(title,todolistId))
    },[])

    const changeStatus= React.useCallback((id: string, isDone: boolean, todolistId: string)=> {
        dispatchTasks(changeStatusAC(id,isDone,todolistId))
    },[])

    const changeTaskTitle = React.useCallback((id: string, newTitle: string, todolistId: string)=> {
        dispatchTasks( changeTaskTitleAC(id,newTitle,todolistId))
    },[])

    const changeFilter=React.useCallback( (value: FilterValuesType, todolistId: string)=> {
        dispatchTodolists(ChangeTodolistFilterAC(todolistId,value))
    },[])

    const removeTodolist=React.useCallback( (id: string)=> {
        dispatchTodolists(RemoveTodolistAC(id))
        dispatchTasks(deleteTaskAC(id,id))
    },[])

    const changeTodolistTitle =React.useCallback((id: string, title: string)=> {
        dispatchTodolists(ChangeTodolistTitleAC(id,title))
    },[])

    const addTodolist= useCallback((title: string)=> {
        const addTodolistACTION = addTodolistAC(title)
        dispatchTodolists(addTodolistACTION)
        dispatchTasks(addTodolistACTION)
    },[])

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
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
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
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppRedux;
