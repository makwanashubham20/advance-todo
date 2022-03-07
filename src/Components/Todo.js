import React,{useState, useEffect} from 'react';
import Head from './Head';
import List from './List';

function Todo(){
    const [todoList, setList] = useState(() => {
        let tmp = localStorage.getItem("todoList");
        if(tmp===null){
            return ([]);
        }   
        else{
            return (JSON.parse(tmp));
        }
    });

    const addTask = (task) => {
        if(!task) 
        {
            alert("Please enter a valid task...");
            return ;
        }
        let list = [...todoList];
        list.push({
            key: todoList.length? todoList[todoList.length-1].key+1:0,
            task: task,
            isCompleted: false
        });
        setList(list);
    }

    const CompleteTask = (id) => {
        let list = todoList.map(item => {
            if(item.key===id){
                return{
                    ...item,
                    isCompleted: !item.isCompleted
                }
            }
            else{
                return item;
            }
        });
        setList(list);
    }

    const deleteTask = (id) => {
        let list = todoList.filter(item => {
            if(item.key!==id){
                return item;
            }
        }); 
        setList(list);
    }

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    const completeAllTasks = (value) => {
        let list = todoList.map((item) => {
            return({
                ...item,
                isCompleted: value
            });
        })
        setList(list);
    }

    return(
        <>
            <Head completeAllTasks={completeAllTasks} addTask={addTask} />
            <List todoList={todoList} CompleteTask={CompleteTask} deleteTask={deleteTask} />
        </>
    )
}

export default Todo;