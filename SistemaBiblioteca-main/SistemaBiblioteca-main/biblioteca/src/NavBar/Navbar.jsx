import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Nav.css';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'; // Importar FaSignOutAlt
import logo from "../Assets/bibliotecalogo.png"; 

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Para obtener la ruta actual
  const navigate = useNavigate(); // Inicializar useNavigate

  const commonLinks = [
    { path: "/", label: "Inicio" },
    { path: "/SolicitarPrestamo", label: "Solicitar préstamo" },
    { path: "/DevolverLibro", label: "Devolver libro" },
    { path: "/Historial", label: "Historial" },
    { path: "/LoginAlum", label: "Login Alumno" },
    { path: "/LoginAdmin", label: "Login Bibliotecario" },
  ];

  const adminLinks = [
    { path: "/AdminIndex", label: "Libros" },
    { path: "/AgregarLibro", label: "Agregar Libro" },
    { path: "/EditarLibro", label: "Editar Libro", disabled: location.pathname !== "/EditarLibro" },
    { path: "/GestionarPrestamos", label: "Gestionar Préstamos" },
  ];

  // Determinar si estamos en una ruta de administración
  const isAdminRoute = location.pathname.startsWith('/AdminIndex') || 
                       location.pathname.startsWith('/AgregarLibro') || 
                       location.pathname.startsWith('/EditarLibro') || 
                       location.pathname.startsWith('/GestionarPrestamos');

  // Manejar el cierre de sesión
  const handleLogout = () => {
    // Lógica para cerrar sesión (si es necesario)
    navigate("/LoginAdmin"); // Redirigir al login de administrador
  };

  return (
    <header className={`navbar ${menuOpen ? 'open' : ''}`}>
      <div className="container">
        {/* Cambiar el enlace del logo dinámicamente */}
        <Link to={isAdminRoute ? "/AdminIndex" : "/"} className="logo">
          <img src={logo} alt="Logo Biblioteca" />
        </Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            {/* Mostrar enlaces comunes si no estamos en una ruta de administración */}
            {!isAdminRoute && commonLinks.map((item) => (
              <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
            {/* Mostrar enlaces de administración si estamos en una ruta de administración */}
            {isAdminRoute && adminLinks.map((item) => (
              <li
                key={item.path}
                className={`${location.pathname === item.path ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
              >
                <Link to={item.disabled ? "#" : item.path}>{item.label}</Link>
              </li>
            ))}
            {/* Agregar ícono de cerrar sesión si estamos en una ruta de administración */}
            {isAdminRoute && (
              <li className="logout-icon" onClick={handleLogout}>
                <FaSignOutAlt title="Cerrar sesión" />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
