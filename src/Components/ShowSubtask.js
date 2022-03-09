import { MdDelete, MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';

function ShowSubtask({item, parentKey, CompleteTask, dragHandler, favoriteATask, deleteTask, clearSubtask, dropHandler}){
    return(
        <li key={item.key} id={item.key} draggable={true} onDragStart={(event) => dragHandler(event, parentKey)} onDrop={clearSubtask} onDragOver={(event) => dropHandler(event,parentKey)}>
            <div className="one-task">
                <input type="checkbox" className="Completed" checked={item.isCompleted} onChange={(event) => CompleteTask(parentKey, item.key)} />
                <span className="editable" onClick={() => CompleteTask(parentKey, item.key)}>{item.isCompleted ? (<s>{item.task}</s>) : <>{item.task}</>}</span>
                {item.isFavorite ? <MdFavorite size="30px" className="fav-task" onClick={() => favoriteATask(parentKey, item.key)} /> : <MdOutlineFavoriteBorder size="30px" className="fav-task" onClick={() => favoriteATask(parentKey, item.key)} />}
                <MdDelete size="30px" className="delete-task" onClick={() => deleteTask(parentKey, item.order)}></MdDelete>
            </div>
        </li>
    );
}

export default ShowSubtask;