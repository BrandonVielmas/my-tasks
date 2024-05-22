import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BoardService } from "../../services/BoardService";
import './style.css'
import { Column } from "../Dashboard/components/Column";
import { TaskService } from "../../services/TaskService";

export function Board() {

    const [board, setBoard] = useState()
    const[columns, setColumns] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const boardId = queryParams.get('board');
    const userId = queryParams.get('user');

    const boardService = new BoardService();
    const taskService = new TaskService();

    useEffect(() => {
        boardService.GetBoardByUserId(boardId, userId).then(res => {
            if(res) {
                setBoard(res.data);
                setColumns(res.data.columns)
                console.log(res.data);
            }
        })
    }, [])

    function handleDeleteTask(taskId, columnId) {
  
        setColumns(prevColumns => {
    
          const updatedColumns = prevColumns.map(column => {
            if(column.id == columnId) {
              column.tasks = column.tasks.filter(task => task.id != taskId);
              taskService.DeleteById(taskId).then(res => {
                if(res) {
                  console.log("Task " + taskId + " borrada.")
                }
              })
            }
            return column;
          })
    
          return updatedColumns;
    
        })
      }

      function handleAddTask(columnId) {
      
        const newTask = {
          name: "Prueba post",
          description: "Prueba desde front",
          columnId: columnId
        }
    
        taskService.Post(newTask).then(res => {
          if(res) {
            getColumns();
          }
        })
      }

      function handleUpdateTaskOfColumn(idTask, idColumn) {
        setColumns(prevColumns => {
            const updatedColumns = prevColumns.map(column => {
                if (column.id === idColumn) {
                    const taskToMove = prevColumns
                        .flatMap(column => column.tasks)
                        .find(task => task.id === idTask);
                    if (taskToMove) {
                        prevColumns.forEach(column => {
                            column.tasks = column.tasks.filter(task => task.id !== idTask);
                        });
                        column.tasks.push(taskToMove);
                        taskService.UpdateTaskOfColumn(idTask, idColumn).then(res => {
                          if(res) {
                            console.log(`La tarea ${idTask} se movió a la columna ${idColumn}.`);
                          }
                        })
                    } else {
                        console.error(`No se encontró la tarea con el ID ${idTask}.`);
                    }
                }
                return column;
            });
            return updatedColumns;
        });
    }
    

    return(
        <>
            <h1>Board, { board && board.description }</h1>
            <div id="container">
                {columns && columns.map((item) => {
                    return <Column 
                            key={item.id}
                            id={"column-" + item.id}
                            elements={item.tasks}
                            description={item.description}
                            handleUpdateTaskOfColumn={handleUpdateTaskOfColumn}
                            handleAddTask={() => handleAddTask(item.id)} 
                            handleDeleteTask={(taskId) => handleDeleteTask(taskId, item.id)}
                        />
                })}
            </div>
        </>
    );
}