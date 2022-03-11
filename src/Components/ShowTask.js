import { MdDelete, MdFavorite, MdOutlineFavoriteBorder, MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Add from './Add';
import ShowSubtask from './ShowSubtask';
import {Checkbox} from 'antd';

function ShowTask({item, dragHandler, dropHandler, completeTask, favoriteATask, deleteTask, setTask, addSubtask, completeSubtask, favoriteAsubTask, deleteSubtask, handleSubtaskdrag, clearSubtask, handleSubtaskdrop}) {

    return (
        <li key={item.key} id={item.key} draggable={true}
            onDragOver={(ev) => ev.preventDefault()} onDragStart={dragHandler} onDragEnter={dropHandler}
            onTouchStart={dragHandler} onTouchMove={dropHandler} onDrop={clearSubtask}>
            <div className="one-task">
                <Checkbox className="Completed" onChange={() => completeTask(item.order)} checked={item.isCompleted} />
                <span className="editable" onClick={() => {setTask(item.key);}}>{item.isCompleted ? (<s>{item.task}</s>) : <>{item.task}</>}
                    <div>
                        {item.date}
                    </div>
                </span>
                {item.isFavorite ? <MdFavorite size="35px" className="fav-task" onClick={() => favoriteATask(item.order)} /> : <MdOutlineFavoriteBorder size="35px" className="fav-task" onClick={() => favoriteATask(item.order)} />}
                <MdDelete size="35px" className="delete-task" onClick={() => deleteTask(item.order)}></MdDelete>
                {(item.isTask === true) ?
                    <MdArrowDropUp className="fav-task" size="35px" 
                    onClick={() => {setTask(item.key);}} /> 
                    : <MdArrowDropDown className='fav-task' size="35px" 
                        onClick={() => {setTask(item.key);}} />}
            </div>
            {item.isTask?
            <div className="sub-task">
                <Add type="Subtask" addTask={(name, date) => addSubtask(name, date, item.order)} />
                <ul>
                    {
                        item.subTasks.map(items => {
                            return <ShowSubtask item={items} parentID={item.key} parentOrder={item.order} completeTask={completeSubtask} 
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