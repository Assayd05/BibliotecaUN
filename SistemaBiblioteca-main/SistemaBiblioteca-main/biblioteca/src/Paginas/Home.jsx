import React from 'react';
import { motion } from 'framer-motion';
import './Desings/HomeDesing.css';

export const Home = () => {
  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1>Bienvenido a la Biblioteca</h1>
    </motion.div>
  );
};
