import { memo, useState } from 'react';

function Head({ addTask }) {
    const [input, setInput] = useState("");
    const [isNewTask, setNewTask] = useState(false);
  
    const changeHandler = (event) => {
        setInput(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        addTask(input);
        setInput("");
        setNewTask(false);

    }

    const cancelHandler = (event) => {
        event.preventDefault();
        setInput("");
        setNewTask(false);
    }

    const initiateHandler =(event) => {
        event.preventDefault();
        setNewTask(true);
    }

    const showInput = (<div className="add-task">
        <legend>Title</legend>
        <input type="text" className="task-input" placeholder="Task" autoComplete="off" value={input} onChange={changeHandler} />
        <div className="button-line">
            <button onClick={cancelHandler}>Close</button>
            <button onClick={submitHandler}>Add Task</button>
        </div>
    </div>);

    const showButton = (<>
        <button className="initiate-addtask" onClick={initiateHandler}>Add New Task</button>
    </>)

    return (
        <form className="input-form">
            {isNewTask? showInput:showButton}
        </form>
    )
}

export default memo(Head);