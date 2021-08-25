import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import Input from "./components/Input/Input";
import EdSpan from "./components/Editablespan/EdSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTasks:(title:string,todolistID:string,taskid:string)=>void;
    updateTasksTitle : (title:string,todolistID:string)=>void;
}

export function Todolist(props: PropsType) {



    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3>{/* {props.title}*/}
            <EdSpan title={props.title} callback={(title)=>props.updateTasksTitle(title,props.id)}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <Input calback={(title)=>props.addTask(title,props.id)}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>

                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>

                        <EdSpan title={t.title} callback={(title)=>props.updateTasks(title,props.id,t.id)} />


                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


