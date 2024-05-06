import React, { useEffect, useState } from "react";
import { ColumnService } from "../../services/ColumnService";
import { TaskService } from "../../services/TaskService";
import { Column } from "./components/Column";
import './style.css'

export function Dashboard() {

    const[columns, setColumns] = useState([]);
  
    const columnService = new ColumnService();
    const taskService = new TaskService();
  
    useEffect(() => {
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
  
    // const addElements = (id) => {
  
    //   const newElement = {
    //     id: uuidv4(),
    //     title: "Test",
    //     description: "Prueba"
    //   }
  
    //   // Actualiza el estado para agregar el nuevo elemento
    //   setElements(prevElements => {
    //     // Crea una copia del array de elementos para no mutar el estado directamente
    //     const updatedElements = [...prevElements];
  
    //     // Encuentra el índice del objeto en el array de elementos
    //     const index = updatedElements.findIndex(item => item.id === id);
  
    //     // Si se encuentra el índice, agrega el nuevo elemento al array de elementos del objeto
    //     if (index !== -1) {
    //       updatedElements[index].elements.push(newElement);
    //     }
  
    //     // Devuelve el nuevo array de elementos actualizado
    //     return updatedElements;
    //   });
    // }
  
     return(
      <>
        <h1>Kanban</h1>
        <div id="container">
          {columns.map((item) => {
            return <Column 
              key={item.id} 
              handleDeleteTask={(taskId) => handleDeleteTask(taskId, item.id)} 
              id={"column-" + item.id} 
              handleAddTask={() => handleAddTask(item.id)} 
              elements={item.tasks} 
              color={item.color} 
              description={item.description} />
          })}
        </div>
      </>
     );
   }