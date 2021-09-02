import React, {ChangeEvent, useState} from "react";
import {filterValues} from "../App";
import Input from "./Input/input";

type PropsToDoListType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (TaskType: string) => void;
    changeFilter: (filter: filterValues) => void;
    addTasks: (title: string) => void;
    changeStatus : (taskId:string,isDone:boolean)=> void;

}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean

}

function ToDoList(props: PropsToDoListType) {

    const changeAll = () => props.changeFilter('all')
    const changeActive = () => props.changeFilter('active')
    const changeCompleted = () => props.changeFilter('completed')
    const [title, setTitle] = useState<string>('input pleas')


    const taskJsxElement = props.tasks.map((t) => {
        const onChangeHandler = (e : ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id,e.currentTarget.checked)
        return (
            <li key={t.id}><input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeHandler}
            /> <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>X
                </button>
            </li>

        )
    })
    return (<div>
        <h3>{props.title}</h3>
        <Input addTasks={props.addTasks} title={title} setTitle={setTitle} />

                    <ul>
                {taskJsxElement}
                    </ul>
                    <div>
                    <button onClick={changeAll}>All</button>
                    <button onClick={changeActive}>Active</button>
                    <button onClick={changeCompleted}>Completed</button>
                    </div>
                    </div>)
                }

                export default ToDoList
            ;