function List({ item, deleteTask, CompleteTask, dragHandler, dropHandler }) {

    return (
        <li key={item.key} id={item.key} draggable={true} onDragOver={(ev) => ev.preventDefault()} onDragStart={dragHandler} onDrop={dropHandler}>
            <input type="checkbox" className="Completed" checked={item.isCompleted} onChange={() => CompleteTask(item.key)} />
            <span className="editable" onClick={() => CompleteTask(item.key)}>{item.isCompleted ? (<s>{item.task}</s>) : <>{item.task}</>}</span>
            <button onClick={() => deleteTask(item.key)} id="delete-task">X</button>
        </li>
    );
}

export default List;