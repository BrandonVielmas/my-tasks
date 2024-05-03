import React, { useState, useEffect } from "react";

export function ModalAddTask({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
      nombre: '',
      descripcion: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes manejar la lógica para enviar los datos del formulario
      console.log('Formulario enviado:', formData);
      // Luego cierra el modal
      onClose();
    };
  
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
  
    const handleClickOutside = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    useEffect(() => {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, []);
  
    return (
      <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleClickOutside}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Agregar nueva tarea</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre: </label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripcion: </label>
              <input type="descripcion" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    );
  }