import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';
import {useReducer} from "react";

export type removeTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type addTodolistActionType =ReturnType<typeof addTodolistAC>
export type changeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type changeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>

type ActionsType = removeTodolistActionType | addTodolistActionType | changeTodolistFilterActionType | changeTodolistTitleActionType

export let todolistId1 = v1();
export let todolistId2 = v1();

const initionalState:Array<TodolistType> = []

export const ToDoListsReducer = (state = initionalState , action: ActionsType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {id:action.todolistId, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title: title,todolistId:v1()} as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId} as const
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType)=> {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId} as const
}
