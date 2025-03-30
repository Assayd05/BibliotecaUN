import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Desings/AgregarLibroDesing.css'; // Asegúrate de crear este archivo para los estilos

export const AgregarLibro = () => {
  const [isbn, setIsbn] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isbn || !titulo || !autor || cantidad < 1) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
    const nuevoLibro = {
      isbn,
      titulo,
      autor,
      cantidad,
    };
    console.log('Libro agregado:', nuevoLibro);
    alert('Libro agregado exitosamente');
    setIsbn('');
    setTitulo('');
    setAutor('');
    setCantidad(1);
  };

  return (
    <motion.div
      className="agregar-libro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Agregar Libro</h2>
      <form className="agregar-libro-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ISBN:</label>
          <input
            type="text"
            placeholder="Ingrese el ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            placeholder="Ingrese el título del libro"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Autor:</label>
          <input
            type="text"
            placeholder="Ingrese el autor del libro"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            min="1"
            placeholder="Ingrese la cantidad disponible"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            required
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Agregar Libro
        </motion.button>
      </form>
    </motion.div>
  );
};
