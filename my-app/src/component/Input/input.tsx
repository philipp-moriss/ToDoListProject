import React, {ChangeEvent, KeyboardEvent} from "react";
import Button from "../Button";
import  style from './input.module.css'

type InputPropsType = {
    addTasks : (title: string)=>void;
    title : string;
    setTitle : (s:string)=> void
}



function Input(props:InputPropsType) {

    const addTaskHandler = () => {
        if (props.title.trim() === ''){
            return;
        }
      props.addTasks (props.title.trim())
        props.setTitle('')
    }

    const onKeyPressAddTasks = (e : KeyboardEvent<HTMLInputElement> ) => {
        if (e.key === 'Enter' ){
            props.addTasks(props.title)
            props.setTitle('')

        }
    }

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => props.setTitle(e.currentTarget.value)

    return (<div>
        <input
            className={style.error}
            value={props.title}
            onChange={changeTitle}
            onKeyPress={onKeyPressAddTasks}
        />
        <Button addTaskHandler={addTaskHandler}/>
        <div className={style.errorMessage}>error</div>
    </div>)
}







export default Input