import { memo, useState } from 'react';

function Head({ addTask, type }) {
    const [input, setInput] = useState("");
    const [inputDate, setDate] = useState("");
    const [isNewTask, setNewTask] = useState(false);
  
    const changeHandler = (event) => {
        setInput(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(input===""){
            alert(`Please Enter valid ${type} name.`);
            return ;
        }
        addTask(input, inputDate);
        setInput("");
        setDate("");
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
        <input type="text" className="task-input" placeholder={type} autoComplete="off" value={input} onChange={changeHandler} />
        <br />
        <legend>Due date</legend>
        <input type="date" className="task-input" value={inputDate} onChange={(event) => {
            setDate(event.target.value);
        }}/>
        <div className="button-line">
            <button onClick={cancelHandler}>Close</button>
            <button onClick={submitHandler}>Add {type}</button>
        </div>
    </div>);

    const showButton = (<>
        <button className="initiate-addtask" onClick={initiateHandler}>Add New {type}</button>
    </>)

    return (
        <form className="input-form">
            {isNewTask? showInput:showButton}
        </form>
    )
}

export default memo(Head);