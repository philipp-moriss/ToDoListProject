import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type removeTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type addTodolistActionType =ReturnType<typeof addTodolistAC>
export type changeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type changeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>

type ActionsType = removeTodolistActionType | addTodolistActionType | changeTodolistFilterActionType | changeTodolistTitleActionType

export const ToDoListsReducer = (state: Array<TodolistType>, action: ActionsType) => {
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
            throw new Error("I don't understand this type")
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
