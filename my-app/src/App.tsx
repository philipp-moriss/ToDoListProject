import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./component/toDoList";
import {v1} from "uuid";

export type filterValues = 'all' | 'active' | 'complited'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true,},
        {id: v1(), title: 'JS', isDone: true,},
        {id: v1(), title: 'React', isDone: false,},
    ])

    const [filter, setFiltet] = React.useState<filterValues>('all')

    const removeTask = (TaskID: string) => {
        let filtredTasks = tasks.filter((t => t.id !== TaskID))
        setTasks(filtredTasks)

    }

    const addTasks = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks([newTask, ...tasks])
    }


    const changeFilter = (filter: filterValues) => {
        setFiltet(filter)
    }


    let tasksForTuDolist = tasks
    if (filter === 'active') {
        tasksForTuDolist = tasks.filter((t => !t.isDone))
    }
    if (filter === 'complited') {
        tasksForTuDolist = tasks.filter((t => t.isDone))
    }


    return (
        <div className="App">
            <ToDoList
                changeFilter={changeFilter}
                removeTask={removeTask}
                tasks={tasksForTuDolist}
                title='What to learn'
                addTasks={addTasks}
            />
        </div>
    );
}

export default App;
