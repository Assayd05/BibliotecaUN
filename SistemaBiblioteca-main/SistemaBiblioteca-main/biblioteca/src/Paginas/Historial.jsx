import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Desings/HistorialDesing.css';

export const Historial = () => {
  const [loans, setLoans] = useState([]);

  // Cada cierto tiempo se actualiza desde la variable global
  useEffect(() => {
    const interval = setInterval(() => {
      setLoans([...window.loans]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="historial-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Historial de Préstamos</h2>
      <div className="historial-list">
        {loans.length === 0 ? (
          <p>No hay préstamos registrados</p>
        ) : (
          loans.map((loan) => (
            <div key={loan.id} className="historial-item">
              <div className="info-left">
                <img src={loan.image} alt={loan.title} className="historial-img" />
              </div>
              <div className="info-right">
                <p><strong>ID préstamo:</strong> {loan.id}</p>
                <p><strong>Matrícula:</strong> {loan.matricula}</p>
                <p><strong>ISBN:</strong> {loan.isbn}</p>
                <p><strong>Fecha de préstamo:</strong> {loan.fechaPrestamo}</p>
                <p><strong>Fecha de devolución:</strong> {loan.fechaDevolucion}</p>
                <p><strong>Cantidad solicitada:</strong> {loan.cantidad}</p>
                <p>
                  <strong>Estado:</strong> {loan.returned ? 
                    <span className="devuelto">Devuelto</span> : 
                    <span className="pendiente">Pendiente</span>}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};
