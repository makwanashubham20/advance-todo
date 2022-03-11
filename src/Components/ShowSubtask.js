import { MdDelete, MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';

function ShowSubtask({item, parentOrder, completeTask, dragHandler, favoriteATask, deleteTask, clearSubtask, dropHandler, parentID}){
    return(
        <li key={item.key} id={item.key} draggable={true} onDragStart={(event) => dragHandler(event, parentID)} onDrop={clearSubtask} onDragOver={(event) => dropHandler(event,parentID)}>
            <div className="one-task">
                <input type="checkbox" className="Completed" checked={item.isCompleted} onChange={(event) => completeTask(parentOrder, item.order)} />
                <span className="editable-subtask">{item.isCompleted ? (<s>{item.task}</s>) : <>{item.task}</>}
                    <div>
                        {item.date}
                    </div>
                </span>
                {item.isFavorite ? <MdFavorite size="30px" className="fav-task" onClick={() => favoriteATask(parentOrder, item.order)} /> : <MdOutlineFavoriteBorder size="30px" className="fav-task" onClick={() => favoriteATask(parentOrder, item.order)} />}
                <MdDelete size="30px" className="delete-task" onClick={() => deleteTask(parentOrder, item.order)}></MdDelete>
            </div>
        </li>
    );
}

export default ShowSubtask;