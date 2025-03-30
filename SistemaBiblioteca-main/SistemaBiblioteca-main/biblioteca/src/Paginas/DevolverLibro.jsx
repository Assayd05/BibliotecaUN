import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Desings/DevolverDesing.css';

export const DevolverLibro = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoans([...window.loans]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const markAsReturned = (loanId) => {
    window.loans = window.loans.map(loan =>
      loan.id === loanId 
        ? { ...loan, returned: true, fechaDevolucion: new Date().toLocaleDateString() }
        : loan
    );
    setLoans([...window.loans]);
  };

  const pendingLoans = loans.filter(loan => !loan.returned);

  return (
    <motion.div
      className="devolver-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Devolver Libro</h2>
      {pendingLoans.length === 0 ? (
        <p>No hay libros pendientes de devolución.</p>
      ) : (
        <div className="devolver-list">
          {pendingLoans.map((loan) => (
            <div key={loan.id} className="devolver-item">
              <div className="info-left">
                <img src={loan.image} alt={loan.title} className="devolver-img" />
              </div>
              <div className="info-right">
                <p><strong>ID préstamo:</strong> {loan.id}</p>
                <p><strong>Matrícula:</strong> {loan.matricula}</p>
                <p><strong>ISBN:</strong> {loan.isbn}</p>
                <p><strong>Fecha de préstamo:</strong> {loan.fechaPrestamo}</p>
                <p><strong>Fecha de devolución:</strong> {loan.fechaDevolucion}</p>
                <p><strong>Cantidad solicitada:</strong> {loan.cantidad}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => markAsReturned(loan.id)}
                >
                  Marcar como devuelto
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
