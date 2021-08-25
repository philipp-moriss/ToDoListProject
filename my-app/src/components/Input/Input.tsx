import React, {ChangeEvent, KeyboardEvent, useState,} from "react";

type InputPropsTitle = {
    calback: (title: string) => void;
}





function Input(props:InputPropsTitle) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addTaskTitle = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.calback(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
            setTitle('')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTaskTitle();
        }
    }


    return (<div>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskTitle}>+</button>
            {error ? <div className={'error-message'}>not corected value</div>: null}
        </div>
    </div>)
}

export default Input;