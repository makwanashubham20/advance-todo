import {MdDelete} from 'react-icons/md'

function List({ item, deleteTask, CompleteTask, dragHandler, dropHandler }) {

    return (
        <li key={item.key} id={item.key} draggable={true} 
        onDragOver={(ev) => ev.preventDefault()} onDragStart={dragHandler} onDragEnter={dropHandler}
        onTouchStart={dragHandler} onTouchMove={dropHandler}>
            <input type="checkbox" className="Completed" checked={item.isCompleted} onChange={() => CompleteTask(item.key)} />
            <span className="editable" onClick={() => CompleteTask(item.key)}>{item.isCompleted ? (<s>{item.task}</s>) : <>{item.task}</>}</span>
            <MdDelete size="30px" className="delete-task" onClick={() => deleteTask(item.order)}></MdDelete>
        </li>
    );
}

export default List;