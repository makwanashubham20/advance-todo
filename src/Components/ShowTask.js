import { clear } from '@testing-library/user-event/dist/clear';
import { MdDelete, MdFavorite, MdOutlineFavoriteBorder, MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Add from './Add';
import ShowSubtask from './ShowSubtask';

function ShowTask({item, dragHandler, dropHandler, CompleteTask, favoriteATask, deleteTask, setTask, addSubtask, completeSubtask, favoriteAsubTask, deleteSubtask, handleSubtaskdrag, clearSubtask, handleSubtaskdrop}) {

    return (
        <li key={item.key} id={item.key} draggable={true}
            onDragOver={(ev) => ev.preventDefault()} onDragStart={dragHandler} onDragEnter={dropHandler}
            onTouchStart={dragHandler} onTouchMove={dropHandler} onDrop={clearSubtask}>
            <div className="one-task">
                <input type="checkbox" className="Completed" checked={item.isCompleted} onChange={() => CompleteTask(item.key)} />
                <span className="editable" onClick={() => CompleteTask(item.key)}>{item.isCompleted ? (<s>{item.task}</s>) : <>{item.task}</>}</span>
                {item.isFavorite ? <MdFavorite size="30px" className="fav-task" onClick={() => favoriteATask(item.key)} /> : <MdOutlineFavoriteBorder size="30px" className="fav-task" onClick={() => favoriteATask(item.key)} />}
                <MdDelete size="30px" className="delete-task" onClick={() => deleteTask(item.order)}></MdDelete>
                {(item.isTask === true) ?
                    <MdArrowDropUp className="fav-task" size="30px" 
                    onClick={() => {setTask(item.key);}} /> 
                    : <MdArrowDropDown className='fav-task' size="30px" 
                        onClick={() => {setTask(item.key);}} />}
            </div>
            {item.isTask?
            <div className="sub-task">
                <Add type="Subtask" addTask={(name) => addSubtask(name, item.key)} />
                <ul>
                    {
                        item.subTasks.map(items => {
                            return <ShowSubtask item={items} parentKey={item.key} CompleteTask={completeSubtask} 
                            deleteTask={deleteSubtask} favoriteATask={favoriteAsubTask}
                            dragHandler={handleSubtaskdrag} clearSubtask={clearSubtask}
                            dropHandler={handleSubtaskdrop} />
                        })
                    }
                </ul>
            </div> : <></>}
        </li>
    );
}

export default ShowTask;