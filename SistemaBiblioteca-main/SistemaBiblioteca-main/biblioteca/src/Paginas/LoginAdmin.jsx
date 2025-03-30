import React from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom"; // Importar Link
import "../Paginas/Desings/Login.css";
import fondo from "../Assets/FondoLogin2.png";
import logo from "../Assets/bibliotecalogo.png";

export const LoginAdmin = () => {
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  const handleLogin = () => {
    // Lógica de autenticación (si es necesario)
    navigate("/AdminIndex"); // Redirigir a /AdminIndex
  };

  return (
    <div
      className="login-page-wrapper"
      style={{ backgroundImage: `url(${fondo})`, backgroundSize: "cover" }}
    >
      <motion.div
        className="login-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Recuadro transparente */}
        <div className="login-background-box">
          <div className="login-box">
            <Link to="/"> {/* Envolver el logo en un Link */}
              <img
                src={logo}
                alt="Biblioteca Logo"
                className="login-logo"
              />
            </Link>

            <h2 className="login-title">Iniciar sesión</h2>

            <motion.div
              className="login-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
              <input
                type="text"
                placeholder="ID Bibliotecario"
                className="login-input"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="login-input"
              />
              <motion.button
                className="login-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogin} // Llamar a handleLogin al hacer clic
              >
                Ingresar
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
