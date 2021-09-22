import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, removeTodolistActionType} from "./to-do-lists-reducer";

type kingActionType = deleteTaskACType
    | addTaskACType
    | changeTaskTitleACType
    | changeStatusACType
    | addTodolistActionType
    | removeTodolistActionType


export const tasksReducer = (state:TasksStateType,action:kingActionType):TasksStateType=>{
    switch (action.type){
        case "DELETE-TASK":{
            return {...state,[action.todolistId]:state[action.todolistId].filter(t=>t.id !== action.id)}
        }
        case "ADD-TASK":{
            let task = {id: v1(), title: action.title, isDone: false};
            return {...state,[action.todolistId]:[task,...state[action.todolistId]]}
        }
        case "CHANGE-TASK-TITLE":{
            return {...state,[action.todolistId]:state[action.todolistId].map(el=>el.id === action.id ?
                    {...el,title:action.newTitle}
                :el)}
        }
        case "CHANGE-TASK-STATUS":{
            return {...state,[action.todolistId]:state[action.todolistId].map(el=>el.id === action.id ?
                    {...el,isDone:action.isDone}
                    :el)}
        }
        case "ADD-TODOLIST":{
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const copystate = state
            delete copystate[action.id]
            //const { [action.id]: remove, ...rest } = { ...state };
            return copystate
        }
        default:{
            return state
        }
    }
}


type deleteTaskACType = ReturnType<typeof deleteTaskAC>

export const deleteTaskAC = (id: string, todolistId: string)=>{
    return{
        type:"DELETE-TASK",
        id: id,
        todolistId: todolistId
    }as const
}

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string)=>{
    return{
        type:"ADD-TASK",
        title: title,
        todolistId: todolistId
    }as const
}


type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string)=>{
    return{
        type:"CHANGE-TASK-TITLE",
        newTitle: newTitle,
        todolistId: todolistId,
        id:id,
    }as const
}


type changeStatusACType = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (id: string, isDone: boolean, todolistId: string)=>{
    return{
        type:"CHANGE-TASK-STATUS",
        isDone:isDone,
        todolistId: todolistId,
        id:id,
    }as const
}





