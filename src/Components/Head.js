import { memo, useState } from 'react';

function Head({ completeAllTasks, addTask }) {
    const [input, setInput] = useState("");
    const [toggle, setToggle] = useState(false);

    const changeHandler = (event) => {
        setInput(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        addTask(input);
        setInput("");
    }

    const completeHandler = (event) => {
        event.preventDefault();
        completeAllTasks(toggle);
        const tmp = toggle;
        setToggle(!tmp);
    }

    return (
        <div id="head">
            <h1>ToDos</h1>
            <form id="input-form">
                <button onClick={completeHandler} id="toggle"><i className="arrow down"></i></button>
                <input type="text" id="task-input" placeholder="Add task name..." autoComplete="off" value={input} onChange={changeHandler} />
                <button id="add-task" onClick={submitHandler}>Add Task</button>
            </form>
        </div>
    )
}

export default memo(Head);