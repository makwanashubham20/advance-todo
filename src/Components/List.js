function List({ item, deleteTask, CompleteTask, dragHandler, dropHandler }) {

    return (
        <li key={item.key} id={item.key} draggable={true} 
        onDragOver={(ev) => ev.preventDefault()} onDragStart={dragHandler} onDragEnter={dropHandler}
        onTouchStart={dragHandler} onTouchMove={dropHandler}>
            <input type="checkbox" className="Completed" checked={item.isCompleted} onChange={() => CompleteTask(item.key)} />
            <span className="editable" onClick={() => CompleteTask(item.key)}>{item.isCompleted ? (<s>{item.task}</s>) : <>{item.task}</>}</span>
            <button onClick={() => deleteTask(item.order)} id="delete-task">X</button>
        </li>
    );
}

export default List;