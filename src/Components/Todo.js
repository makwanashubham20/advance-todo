import { isContentEditable } from '@testing-library/user-event/dist/utils';
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
    const [lastIncomplete, setLast] = useState(0 || Number(localStorage.getItem("lastIncomplete")))
    const [dragid, setDragId] = useState(-1);
    const [childid, setChildId] = useState(-1);

    const addTask = (task, date) => {
        let list = todoList.map(item => {
            return {
                ...item,
                order: item.order+1
            }
        });
        list.unshift({
            key: lastKey + 1,
            task: task,
            isCompleted: false,
            order: 1,
            isFavorite: false,
            isTask: true,
            subtaskKey: 0,
            subTasks: [],
            date: date,
            lastIncomplete: 0
        });
        setLast(prev => prev+1);
        setKey(prev => prev + 1);
        setList(list);
    }

    const favoriteATask = (order) => {
        let list = todoList.map(item => {
            if (item.order === order) {
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

    const CompleteTask = (order) => {
        let flag=true;
        let list = todoList.map(item => {
            if (item.order === order) {
                if(item.isCompleted){
                    flag=false;
                }
                return {
                    ...item,
                    isCompleted: !item.isCompleted
                }
            }
            else {
                return item;
            }
        });

        if(flag){
            list = list.map(item => {
                if(item.order>order && item.order<=lastIncomplete){
                    return{
                        ...item,
                        order: item.order-1
                    }
                }
                else if(item.order===order){
                    return{
                        ...item,
                        order: lastIncomplete
                    }
                }
                else{
                    return item;
                }
            });
            setLast(prev => prev-1);
        }
        else{
            list = list.map(item => {
                if(item.order>=lastIncomplete+1 && item.order<order){
                    return {
                        ...item,
                        order: item.order+1
                    }
                }
                else if(item.order===order){
                    return {
                        ...item,
                        order: lastIncomplete+1
                    }
                }
                else{
                    return item;
                }
            })
            setLast(prev => prev + 1);
        }

        list.sort((a,b) => (a.order-b.order));

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

        if(order<=lastIncomplete){
            setLast(prev => prev -1);
        }

        list=list.sort((a,b) => (a.order-b.order));
        setList(list);
    }

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        localStorage.setItem("lastKey", lastKey);
        localStorage.setItem("lastIncomplete", lastIncomplete);
    }, [todoList, lastKey, lastIncomplete]);

    const handleDrag = (event) => {
        setDragId(Number(event.currentTarget.id));
    }

    const handleDrop = (event) => {
        if (dragid == Number(event.currentTarget.id)) {
            return;
        }

        if (childid !== -1) return;

        const dragItem = todoList.find((item) => item.key === Number(dragid));
        const dropItem = todoList.find((item) => item.key === Number(event.currentTarget.id));

        if(dragItem.isCompleted!==dropItem.isCompleted){
            return ;
        }

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
        updatedList=updatedList.sort((a,b) => (a.order-b.order));
        setList(updatedList);
    }

    const setTask = (parentKey) => {
        const list = todoList.map(item => {
            if (item.key === parentKey) {
                return {
                    ...item,
                    isTask: !item.isTask
                }
            }
            else {
                return item;
            }
        });
        setList(list);
    }

    //subTasks functionalities

    const addSubtask = (name, date, order) => {
        const list = todoList.map(item => {
            if (item.order === order) {
                var updatedList = item.subTasks.map(subitem => {
                    return({
                        ...subitem,
                        order: subitem.order+1
                    });
                })
                updatedList.unshift(
                    {
                        key: item.subtaskKey,
                        task: name,
                        isCompleted: false,
                        order: 1,
                        isTask: false,
                        isFavorite: false,
                        date: date
                    }
                );
                return ({
                    ...item,
                    subtaskKey: item.subtaskKey + 1,
                    subTasks: updatedList,
                    lastIncomplete: item.lastIncomplete+1
                });
            }
            else {
                return item;
            }
        });

        setList(list);
    }

    const favoriteAsubTask = (parentOrder, childOrder) => {
        const list = todoList.map(item => {
            if (item.order === parentOrder) {
                const sublist = item.subTasks.map(subitem => {
                    if (subitem.order === childOrder) {
                        return ({
                            ...subitem,
                            isFavorite: !subitem.isFavorite
                        });
                    }
                    else {
                        return subitem;
                    }
                });
                return ({
                    ...item,
                    subTasks: sublist
                });
            }
            else {
                return item;
            }
        });
        setList(list);
    }

    const deleteSubtask = (parentOrder, childOrder) => {
        const list = todoList.map(item => {
            if (item.order === parentOrder) {
                var sublist = item.subTasks.filter(subitem => {
                    if (subitem.order !== childOrder) {
                        return item;
                    }
                });

                sublist=sublist.map(subitem => {
                    if(subitem.order>childOrder){
                        return {
                            ...subitem,
                            order: subitem.order-1
                        };
                    }
                    else{
                        return subitem;
                    }
                });

                sublist=sublist.sort((a,b) => (a.order-b.order))

                console.log("hello");
                if(childOrder<=item.lastIncomplete){
                    return ({
                        ...item,
                        lastIncomplete: item.lastIncomplete-1,
                        subTasks: sublist
                    });
                }
                else{
                    return ({
                        ...item,
                        subTasks: sublist
                    });
                }

            }
            else {
                return item;
            }
        });

        setList(list);
    }

    const completeSubtask = (parentOrder, childOrder) => {
        let flag = 1;
        let flag2 = true;
        var list = todoList.map(item => {
            if (item.order === parentOrder) {
                var sublist = item.subTasks.map(subitem => {
                    if (subitem.order === childOrder) {
                        if (subitem.isCompleted) {
                            flag = 0;
                            flag2=false;
                        }
                        return ({
                            ...subitem,
                            isCompleted: !subitem.isCompleted
                        });
                    }
                    else {
                        if (!subitem.isCompleted) {
                            flag = 0;
                        }
                        return subitem;
                    }
                });

                if(flag2){
                    sublist = sublist.map(subitem => {
                        if(subitem.order>childOrder && subitem.order<=item.lastIncomplete){
                            return {
                                ...subitem,
                                order: subitem.order-1
                            }
                        }
                        else if(subitem.order===childOrder){
                            return{
                                ...subitem,
                                order: item.lastIncomplete
                            }
                        }
                        else{
                            return subitem;
                        }
                    });
                    sublist.sort((a,b) => (a.order-b.order));
                    return ({
                        ...item,
                        lastIncomplete: item.lastIncomplete-1,
                        subTasks: sublist
                    });
                }
                else{
                    sublist = sublist.map(subitem => {
                        if(subitem.order>=item.lastIncomplete+1 && subitem.order<childOrder){
                            return{
                                ...subitem,
                                order: subitem.order+1
                            };
                        }
                        else if(subitem.order===childOrder){
                            return{
                                ...subitem,
                                order: item.lastIncomplete+1
                            };
                        }
                        else{
                            return subitem;
                        }
                    });
                    
                    sublist.sort((a,b) => (a.order-b.order));
                    return ({
                        ...item,
                        lastIncomplete: item.lastIncomplete+1,
                        subTasks: sublist 
                    });
                }
            }
            else {
                return item;
            }
        });

        setList(list);
    }

    const clearSubtask = (event) => {
        setDragId(-1);
        setChildId(-1);
    }

    const handleSubtaskdrag = (event, parentKey) => {
        setDragId(parentKey);
        setChildId(Number(event.currentTarget.id));
    }

    const handleSubtaskdrop = (event, parentKey) => {
        if (childid === -1) return;
        if (parentKey !== dragid) return;

        if(Number(event.currentTarget.id)===childid){
            return ;
        }

        var element = todoList.find(item => {
            if (item.key === dragid) {
                return item;
            }
        });

        const dragItem = element.subTasks.find((item) => item.key === Number(childid));
        const dropItem = element.subTasks.find((item) => item.key === Number(event.currentTarget.id));

        if(dragItem.isCompleted!==dropItem.isCompleted){
            return ;
        }

        var updatedSubtask = [];

        if (dragItem.order > dropItem.order) {
            updatedSubtask = element.subTasks.map((item) => {
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
            updatedSubtask = element.subTasks.map((item) => {
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

        updatedSubtask = updatedSubtask.sort((a,b) => (a.order-b.order));

        const updatedElement = {
            ...element,
            subTasks: updatedSubtask
        }

        const updatedList = todoList.map(item => {
            if (item.key === parentKey) {
                return updatedElement;
            }
            else {
                return item;
            }
        })

        setList(updatedList);

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
                                .map(items => {
                                    return (
                                        <>
                                            <ShowTask type="task"
                                                completeSubtask={completeSubtask} favoriteAsubTask={favoriteAsubTask} deleteSubtask={deleteSubtask} addSubtask={addSubtask}
                                                favoriteATask={favoriteATask} CompleteTask={CompleteTask} deleteTask={deleteTask} setTask={setTask}
                                                dragHandler={handleDrag} dropHandler={handleDrop}
                                                handleSubtaskdrag={handleSubtaskdrag}
                                                handleSubtaskdrop={handleSubtaskdrop}
                                                clearSubtask={clearSubtask}
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