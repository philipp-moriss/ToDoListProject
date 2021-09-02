import React from "react";

type ButtonPropsType = {
    addTaskHandler : () => void
}

function Button (props : ButtonPropsType) {
    const {addTaskHandler} = props;
    return ( <button
        onClick={addTaskHandler}>+
    </button>)
}



export default Button;