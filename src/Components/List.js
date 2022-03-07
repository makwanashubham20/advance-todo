function List(props) {
    const element = props.todoList.map(item => {
        return (
            <li key={item.key}>
                <input type="checkbox" className="Completed" checked={item.isCompleted} onChange={() => props.CompleteTask(item.key)} />
                <span className="editable" onClick={() => props.CompleteTask(item.key)}>{item.isCompleted? (<s>{item.task}</s>):<>{item.task}</>}</span>
                <button onClick={() => props.deleteTask(item.key)} id="delete-task">X</button>
            </li>
        );
    });

    return (
        <div id="todo-list">
            <ul>
                {element}
            </ul>
        </div>
    )
}

export default List;