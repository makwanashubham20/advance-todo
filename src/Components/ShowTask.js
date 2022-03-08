import { MdDelete, MdFavorite, MdOutlineFavoriteBorder, MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Add from './Add';

function ShowTask(props) {

    return (
        <li key={props.item.key} id={props.item.key} draggable={true}
            onDragOver={(ev) => ev.preventDefault()} onDragStart={props.dragHandler} onDragEnter={props.dropHandler}
            onTouchStart={props.dragHandler} onTouchMove={props.dropHandler} className={props.item.type}>
            <div className="one-task">
                <input type="checkbox" className="Completed" checked={props.item.isCompleted} onChange={() => props.CompleteTask(props.item.key)} />
                <span className="editable" onClick={() => props.CompleteTask(props.item.key)}>{props.item.isCompleted ? (<s>{props.item.task}</s>) : <>{props.item.task}</>}</span>
                {props.item.isFavorite ? <MdFavorite size="30px" className="fav-task" onClick={() => props.favoriteATask(props.item.key)} /> : <MdOutlineFavoriteBorder size="30px" className="fav-task" onClick={() => props.favoriteATask(props.item.key)} />}
                <MdDelete size="30px" className="delete-task" onClick={() => props.deleteTask(props.item.order)}></MdDelete>
                {(props.item.isTask === true) ? <MdArrowDropUp className="fav-task" size="30px" onClick={() => {
                    props.setTask(props.item.key);
                }} /> : (props.type === "task" ? <MdArrowDropDown className='fav-task' size="30px" onClick={() => {
                    props.setTask(props.item.key);
                }} /> : <></>)}
            </div>
            {props.item.isTask === true ?
                <div className="sub-task">
                    <Add type="Subtask" addTask={(name) => props.addSubtask(name, props.item.key)} />
                    <ul>
                        {
                            props.item.subTasks.map(item => {
                                return <ShowTask type="subtask" item={item}
                                    CompleteTask={() => props.completeSubtask(props.item.key, item.key)}
                                    favoriteATask={() => props.favoriteAsubTask(props.item.key, item.key)}
                                    deleteTask={() => props.deleteSubtask(props.item.key, item.key)}

                                />
                            })
                        }
                    </ul>
                </div>
                : <></>}
        </li>
    );
}

export default ShowTask;