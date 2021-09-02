import React, {ChangeEvent, useState} from "react";

type EdSpantype = {
    title : string;
    callback : (title:string) => void;
}

function EdSpan (props: EdSpantype){
    const [title,setTitle]= useState(props.title)
    const [edit,setEdit] = useState<boolean>(false)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const change = (b:boolean)=> {
        setEdit(b)
        props.callback(title)
    }
    const changeEdit = () => change(!edit)

    return (
        edit ?
                <input value={title} onBlur={changeEdit} onChange={onChangeHandler} autoFocus/>
                : <span onDoubleClick={changeEdit}>{props.title}</span>
    )

}


export default EdSpan;