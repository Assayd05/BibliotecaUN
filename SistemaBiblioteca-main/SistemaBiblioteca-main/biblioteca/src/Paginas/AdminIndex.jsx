import React from 'react';
import { motion } from 'framer-motion';
import './Desings/AdminIndexDesing.css'; // Asegúrate de crear este archivo para los estilos

export const AdminIndex = () => {
  const libros = []; // Aquí puedes cargar los libros desde tu base de datos o API

  // Ejemplo de libro de prueba:
  // const libros = [
  //   {
  //     isbn: '9783161484100',
  //     titulo: 'El Quijote',
  //     autor: 'Miguel de Cervantes',
  //     stock: 5,
  //   },
  // ];

  const handleEdit = (isbn) => {
    console.log(`Editar libro con ISBN: ${isbn}`);
    // Aquí puedes agregar la lógica para redirigir a la página de edición
  };

  const handleDelete = (isbn) => {
    console.log(`Eliminar libro con ISBN: ${isbn}`);
    // Aquí puedes agregar la lógica para eliminar el libro
  };

  return (
    <motion.div
      className="admin-index-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <h1 className="admin-welcome">Bienvenido Administrador</h1>
      <div className="admin-table-container">
        <h2>Gestionar Libros</h2>
        {libros.length === 0 ? (
          <p className="no-books-message">No hay libros registrados</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Stock</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {libros.map((libro) => (
                <tr key={libro.isbn}>
                  <td>{libro.isbn}</td>
                  <td>{libro.titulo}</td>
                  <td>{libro.autor}</td>
                  <td>{libro.stock}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(libro.isbn)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(libro.isbn)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};
