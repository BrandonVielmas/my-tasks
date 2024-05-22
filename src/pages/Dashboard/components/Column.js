import React, { useState, useEffect }  from 'react'
import { Task } from './Task';
import { ModalAddTask } from './ModalAddTask';
import '../style.css';

export function Column({ description, elements, id, handleAddTask, handleDeleteTask, handleUpdateTaskOfColumn }) {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function onDragOver(event) {
    event.preventDefault();
  }
  
  function onDrop(event) {
    console.log(event)
    const id = event
      .dataTransfer
      .getData('text');
    
    const regex = /(\d+)/g;
    
    const dropZone = event.target;

    let idTask = +id.match(regex);
    let idColumn = +dropZone.children[1].id.match(regex);
    
    event.dataTransfer.clearData();

    handleUpdateTaskOfColumn(idTask, idColumn);

    
  }

    return (
      <>
        <ModalAddTask isOpen={isModalOpen} onClose={handleCloseModal} />
        <div onDragOver={onDragOver} onDrop={onDrop}>
          <div>
            <h1>Esta es la columna de: {description}</h1>
            <button onClick={() => {
              handleAddTask(id);
            }}>Agregar element</button>
          </div>
            <div id={"elements-" + id}>
              {elements && elements.length > 0 && elements.map((item, index) => (
                <Task 
                  key={index} 
                  handleDeleteTask={() => handleDeleteTask(item.id)}
                  id={item.id} 
                  name={item.name} 
                  description={item.description} />
              ))}
            </div>
        </div>
      </>
    );
  }
