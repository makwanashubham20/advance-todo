import React, { useState, useEffect } from 'react';
import Add from './Add';
import ShowTask from './ShowTask';

function Todo() {
    const [todoList, setList] = useState(() => {
        let tmp = localStorage.getItem("todoList");
        if (tmp === null) {
            return ([]);
        }
        else {
            return (JSON.parse(tmp));
        }
    });

    const [lastKey, setKey] = useState(0 || Number(localStorage.getItem("lastKey")));
    const [dragid, setDragId] = useState(-1);

    const addTask = (task) => {
        if (!task) {
            alert("Please enter a valid task...");
            return;
        }
        let list = [...todoList];
        list.push({
            key: lastKey + 1,
            task: task,
            isCompleted: false,
            order: todoList.length + 1,
            isFavorite: false,
            isTask: true,
            subtaskKey: 0,
            subTasks: []
        });
        setKey(prev => prev + 1);
        setList(list);
    }

    const favoriteATask = (key) => {
        let list = todoList.map(item => {
            if (item.key === key) {
                return {
                    ...item,
                    isFavorite: !item.isFavorite
                }
            }
            else {
                return item;
            }
        });
        setList(list);
    }

    const CompleteTask = (id) => {
        let list = todoList.map(item => {
            if (item.key === id) {
                return {
                    ...item,
                    isCompleted: !item.isCompleted
                }
            }
            else {
                return item;
            }
        });
        setList(list);
    }

    const deleteTask = (order) => {
        let list = todoList.filter(item => {
            if (item.order !== order) {
                return item;
            }
        })
        list = list.map(item => {
            if (item.order !== order) {
                if (item.order > order) {
                    return {
                        ...item,
                        order: item.order - 1
                    }
                }
                else {
                    return item;
                }
            }
        });
        setList(list);
    }

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        localStorage.setItem("lastKey", lastKey);
    }, [todoList, lastKey]);

    const handleDrag = (event) => {
        setDragId(event.currentTarget.id);
    }

    const handleDrop = (event) => {
        if (dragid == Number(event.currentTarget.id)) {
            return;
        }

        const dragItem = todoList.find((item) => item.key === Number(dragid));
        const dropItem = todoList.find((item) => item.key === Number(event.currentTarget.id));

        var updatedList = [];

        if (dragItem.order > dropItem.order) {
            updatedList = todoList.map((item) => {
                if (item.order === dragItem.order) {
                    return {
                        ...item,
                        order: dropItem.order
                    }
                }
                else if (item.order >= dropItem.order && item.order < dragItem.order) {
                    return {
                        ...item,
                        order: item.order + 1
                    }
                }
                else {
                    return item;
                }
            })
        }
        else if (dragItem.order < dropItem.order) {
            updatedList = todoList.map((item) => {
                if (item.order === dragItem.order) {
                    return {
                        ...item,
                        order: dropItem.order
                    }
                }
                else if (item.order > dragItem.order && item.order <= dropItem.order) {
                    return {
                        ...item,
                        order: item.order - 1
                    }
                }
                else {
                    return item;
                }
            })
        }
        setList(updatedList);
    }

    const setTask = (parentKey) => {
        const list = todoList.map(item => {
            if(item.key===parentKey){
                return {
                    ...item,
                    isTask: !item.isTask
                }
            }
            else{
                return item;
            }
        });
        setList(list);
    }

    //subTasks functionalities

    const addSubtask = (name, key) => {
        const list = todoList.map(item => {
            if (item.key === key) {
                return ({
                    ...item,
                    subtaskKey: item.subtaskKey + 1,
                    subTasks: [
                        ...item.subTasks,
                        {
                            key: item.subtaskKey,
                            task: name,
                            isCompleted: false,
                            order: item.subTasks.length + 1,
                            isTask: false,
                            isFavorite: false
                        }
                    ]
                });
            }
            else {
                return item;
            }
        });
        setList(list);
    }

    const favoriteAsubTask = (parentKey, childKey) => {
        const list = todoList.map(item => {
            if(item.key=== parentKey){
                const sublist = item.subTasks.map(subitem => {
                    if(subitem.key === childKey){
                        return ({
                            ...subitem,
                            isFavorite: !subitem.isFavorite
                        });
                    }
                    else{
                        return subitem;
                    }
                });
                return({
                    ...item,
                    subTasks: sublist
                });
            }
            else{
                return item;
            }
        });
        setList(list);
    }

    const deleteSubtask = (parentKey, childKey) => {
        const list = todoList.map(item => {
            if(item.key=== parentKey){
                const sublist = item.subTasks.filter(subitem => {
                    if(subitem.key !== childKey){
                        return item;
                    }
                });
                return({
                    ...item,
                    subTasks: sublist
                });
            }
            else{
                return item;
            }
        });
        setList(list);
    }

    const completeSubtask = (parentKey, childKey) => {
        let flag=1;
        var list = todoList.map(item => {
            if(item.key=== parentKey){
                const sublist = item.subTasks.map(subitem => {
                    if(subitem.key === childKey){
                        if(subitem.isCompleted){
                            flag=0;
                        }
                        return ({
                            ...subitem,
                            isCompleted: !subitem.isCompleted
                        });
                    }
                    else{
                        if(!subitem.isCompleted){
                            flag=0;
                        }
                        return subitem;
                    }
                });
                return({
                    ...item,
                    subTasks: sublist
                });
            }
            else{
                return item;
            }
        });

        if(flag){
            list = list.map(item => {
                if(item.key===parentKey){
                    return{
                        ...item,
                        isCompleted:true
                    }
                }
                else{
                    return item;
                }
            }) 
        }

        setList(list);
    }

    return (
        <>
            <hr />
            <h1>ToDo List</h1>
            <Add type="Task" addTask={addTask} />
            <div id="todo-list">
                {todoList.length > 0 ?
                    <ul>
                        {
                            todoList
                                .sort((a, b) => a.order - b.order)
                                .map(items => {
                                    return (
                                        <>
                                            <ShowTask type="task" 
                                            completeSubtask={completeSubtask} favoriteAsubTask={favoriteAsubTask} deleteSubtask={deleteSubtask} addSubtask={addSubtask} 
                                            favoriteATask={favoriteATask} CompleteTask={CompleteTask} deleteTask={deleteTask} setTask={setTask}
                                            dragHandler={handleDrag} dropHandler={handleDrop} 
                                            item={items} />
                                        </>
                                    );
                                })
                        }
                    </ul> :
                    <p>Nothing to do! Add a task?</p>
                }

            </div>
        </>
    )
}

export default Todo;