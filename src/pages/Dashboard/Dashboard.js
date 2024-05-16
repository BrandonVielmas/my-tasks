import React, { useEffect, useState } from "react";
import { ColumnService } from "../../services/ColumnService";
import { TaskService } from "../../services/TaskService";
import { Column } from "./components/Column";
import './style.css'
import { useNavigate } from "react-router-dom";

export function Dashboard() {

    const[columns, setColumns] = useState([]);
    const navigate = useNavigate();
  
    const columnService = new ColumnService();
    const taskService = new TaskService();
  
    useEffect(() => {
      
      const isLogged = localStorage.getItem('EstaDentro');

      if(!isLogged) {
        navigate("/loggin");
      }

      getColumns();
    }, []);
  
    function getColumns() {
      columnService.GetAll().then(res => {
        setColumns(res.data);
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

    function handleBtnSalir() {
      localStorage.removeItem('EstaDentro');
      navigate("/loggin");
  }
  
     return(
      <>
        <h1>Kanban</h1>
        <button onClick={() => handleBtnSalir()}>Salir </button>
        <div id="container">
          {columns.map((item) => {
            return <Column 
              key={item.id} 
              handleDeleteTask={(taskId) => handleDeleteTask(taskId, item.id)} 
              id={"column-" + item.id} 
              handleAddTask={() => handleAddTask(item.id)} 
              handleUpdateTaskOfColumn={handleUpdateTaskOfColumn}
              elements={item.tasks} 
              color={item.color} 
              description={item.description} />
          })}
        </div>
      </>
     );
   }