import React from 'react';
import { motion } from 'framer-motion';
import './Desings/GestionPrestamosDesing.css'; // Asegúrate de crear este archivo para los estilos

export const GestionarPrestamos = () => {
  const prestamos = [
    {
      id: '1',
      matricula: 'A12345',
      isbn: '9783161484100',
      fechaPrestamo: '2025-03-01',
      fechaDevolucion: '2025-03-15',
      cantidadSolicitada: 1,
      cantidadDisponible: 4,
    },
  ]; // Ejemplo de datos de prueba

  return (
    <motion.div
      className="gestion-prestamos-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <h1 className="gestion-prestamos-title">Reporte de Libros Prestados y Disponibles</h1>
      <div className="gestion-prestamos-table-container">
        {prestamos.length === 0 ? (
          <p className="no-prestamos-message">No hay registros de préstamos</p>
        ) : (
          <table className="gestion-prestamos-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Matrícula del Estudiante</th>
                <th>ISBN del Libro</th>
                <th>Fecha de Préstamo</th>
                <th>Fecha de Devolución</th>
                <th>Cantidad Solicitada</th>
                <th>Stock del Libro</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map((prestamo, index) => (
                <tr key={index}>
                  <td>{prestamo.id}</td>
                  <td>{prestamo.matricula}</td>
                  <td>{prestamo.isbn}</td>
                  <td>{prestamo.fechaPrestamo}</td>
                  <td>{prestamo.fechaDevolucion}</td>
                  <td>{prestamo.cantidadSolicitada}</td>
                  <td>{prestamo.cantidadDisponible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};
