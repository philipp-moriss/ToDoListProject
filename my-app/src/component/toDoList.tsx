import React, {ChangeEvent, KeyboardEvent , useState} from "react";
import {filterValues} from "../App";

type PropsToDoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (TaskType: string) => void
    changeFilter: (filter: filterValues) => void
    addTasks: (title: string) => void

}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean

}

function ToDoList(props: PropsToDoListType) {

    const [title, setTitle] = useState<string>('input pleas')

    const changeAll = () => props.changeFilter('all')
    const changeActive = () => props.changeFilter('active')
    const changeComplited = () => props.changeFilter('complited')

    const addTasks = ()=> {props.addTasks(title)
        setTitle('')
    }

    const onKeyPressAddTasks = (e : KeyboardEvent<HTMLInputElement> ) => {
        if (e.key === 'Enter' ){
            addTasks()
        }
    }

    const changeTitel = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const taskJsxElement = props.tasks.map((t) => {
        return (
            <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>X
                </button>
            </li>

        )
    })
    return (<div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={changeTitel}
                onKeyPress={onKeyPressAddTasks}
            />
            <button
                onClick={addTasks}>+</button>
                    </div>
                    <ul>
                {taskJsxElement}
                    </ul>
                    <div>
                    <button onClick={changeAll}>All</button>
                    <button onClick={changeActive}>Active</button>
                    <button onClick={changeComplited}>Completed</button>
                    </div>
                    </div>)
                }

                export default ToDoList
            ;