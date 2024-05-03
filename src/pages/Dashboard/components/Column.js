import React, { useState, useEffect }  from 'react'
import { Task } from './Task';
import { ModalAddTask } from './ModalAddTask';

export function Column({ description, color, elements, id, handleAddTask, handleDeleteTask }) {

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
    const id = event
      .dataTransfer
      .getData('text');
    
    const draggableElement = document.getElementById(id);
    const dropZone = event.target;
  
    const hijo = dropZone.children[1];
  
    hijo.appendChild(draggableElement);
    
    event.dataTransfer.clearData();
  }

    return (
      <>
        <ModalAddTask isOpen={isModalOpen} onClose={handleCloseModal} />
        <div onDragOver={onDragOver} onDrop={onDrop} style={{ backgroundColor: color }}>
          <div>
            <h1>Esta es la columna de: {description}</h1>
            <button onClick={() => {
              handleOpenModal(true);
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
