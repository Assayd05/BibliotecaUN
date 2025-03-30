import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Desings/SolicitarDesing.css';


if (!window.loans) {
  window.loans = [];
}


const books = [
  { 
    id: 1, 
    title: 'El Quijote', 
    isbn: '9783161484100', 
    description: 'Un clásico de la literatura española, escrito por Miguel de Cervantes', 
    image: 'https://via.placeholder.com/300x400?text=El+Quijote',
    available: 5 
  },
  { 
    id: 2, 
    title: '1984', 
    isbn: '9780452284234', 
    description: 'Novela distópica de George Orwell que explora un futuro totalitario.', 
    image: 'https://via.placeholder.com/300x400?text=1984',
    available: 3 
  },
  { 
    id: 3, 
    title: 'Cien Años de Soledad', 
    isbn: '9780060883287', 
    description: 'Obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía.', 
    image: 'https://i.scdn.co/image/ab67616d0000b273f83a664f67dd705a5ef1105e',
    available: 4 
  },
];

export const SolicitarPrestamo = () => {
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [matricula, setMatricula] = useState('');
  const [cantidadSolicitada, setCantidadSolicitada] = useState(1);
  const [fechaDevolucion, setFechaDevolucion] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim().length > 0) {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
      setSelectedBook(null);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setFilteredBooks([]);
    setSearch(book.title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBook || !matricula || !fechaDevolucion) return;
    if (cantidadSolicitada > selectedBook.available) {
      alert('La cantidad solicitada supera la disponibilidad.');
      return;
    }
    const newLoan = {
      id: Date.now(), // ID préstamo generado automáticamente
      matricula,
      isbn: selectedBook.isbn,
      title: selectedBook.title,
      description: selectedBook.description,
      image: selectedBook.image,
      cantidad: cantidadSolicitada,
      fechaPrestamo: new Date().toLocaleDateString(),
      fechaDevolucion,
      returned: false,
    };
    // Se agrega el préstamo a la variable global
    window.loans.push(newLoan);
    alert('Préstamo registrado');
    // Limpiar el formulario
    setMatricula('');
    setFechaDevolucion('');
    setCantidadSolicitada(1);
    setSelectedBook(null);
    setSearch('');
  };

  return (
    <motion.div
      className="solicitar-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Solicitar Préstamo</h2>
      <form className="solicitar-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Matrícula del alumno:</label>
          <input 
            type="text" 
            placeholder="Ingrese matrícula" 
            value={matricula} 
            onChange={(e) => setMatricula(e.target.value)} 
            required 
          />
        </div>
        <div className="search-box">
          <label>Buscar libro:</label>
          <input
            type="text"
            placeholder="Buscar libro por nombre"
            value={search}
            onChange={handleSearchChange}
            autoComplete="off"
          />
          {filteredBooks.length > 0 && (
            <ul className="suggestions">
              {filteredBooks.map(book => (
                <li key={book.id} onClick={() => handleSelectBook(book)}>
                  {book.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedBook && (
          <div className="book-detail">
            <img src={selectedBook.image} alt={selectedBook.title} />
            <div className="book-info">
              <h3>{selectedBook.title}</h3>
              <p>{selectedBook.description}</p>
              <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
              <p><strong>Disponibles:</strong> {selectedBook.available}</p>
            </div>
          </div>
        )}
        {selectedBook && (
          <div className="form-group">
            <label>Cantidad a solicitar:</label>
            <input 
              type="number" 
              min="1" 
              max={selectedBook.available} 
              value={cantidadSolicitada}
              onChange={(e) => setCantidadSolicitada(Number(e.target.value))}
              required 
            />
          </div>
        )}
        <div className="form-group">
          <label>Fecha de devolución:</label>
          <input 
            type="date" 
            value={fechaDevolucion} 
            onChange={(e) => setFechaDevolucion(e.target.value)} 
            required 
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Solicitar Préstamo
        </motion.button>
      </form>
    </motion.div>
  );
};
