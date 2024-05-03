import React, { useState } from "react";

export function Task({ id, name, description, handleDeleteTask }) {

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    function onDragStart(event) {
        event
          .dataTransfer
          .setData('text/plain', event.target.id);
      }
    
    const handleContextMenu = (event) => {
      event.preventDefault();
      setMenuPosition({ x: event.clientX, y: event.clientY });
      setMenuVisible(true);
    };
    
    const handleClickOutsideMenu = () => {
      setMenuVisible(false);
    };
  
    const handleDeleteTaskLocal = (id) => {
      handleDeleteTask(id);
      setMenuVisible(false);
    }
  
    return(
      <>
        <div onContextMenu={handleContextMenu} onClick={handleClickOutsideMenu} draggable="true" id={"element-" + id} onDragStart={onDragStart} className="elementColumn" >
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        {menuVisible && (
          <div style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x }}>
            <ul>
              <li>
                <button onClick={() => handleDeleteTaskLocal(id)}>Borrar</button>
              </li>
            </ul>
          </div>
        )}
      </>
    );
  }