import React, { useState, useEffect } from 'react';
import Add from './Add';
import List from './ShowTask';

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
            order: todoList.length + 1
        });
        setKey(prev => prev + 1);
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

    return (
        <>
            <hr />
            <h1>ToDo List</h1>
            <Add addTask={addTask} />
            <div id="todo-list">
                <ul>
                    {
                        todoList
                            .sort((a, b) => a.order - b.order)
                            .map(items => {
                                return (
                                    <>
                                    <List CompleteTask={CompleteTask} dragHandler={handleDrag} dropHandler={handleDrop} deleteTask={deleteTask} item={items} />
                                    </>
                                );
                            })
                    }
                </ul>
            </div>
        </>
    )
}

export default Todo;