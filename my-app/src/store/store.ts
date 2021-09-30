
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from "../state/tasks.reducer";
import {todolistId1, todolistId2, ToDoListsReducer} from "../state/to-do-lists-reducer";
import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: ToDoListsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer,{
    tasks:{
        "todolistId1": [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        "todolistId2": [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    } ,
    todolists : [
    {id: "todolistId1", title: "What to learn", filter: "all"},
    {id: "todolistId2", title: "What to buy", filter: "all"}
]
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;