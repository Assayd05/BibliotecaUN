const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'SistemaEscolar'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// ------------------- ENDPOINTS -------------------

// Endpoints para la tabla Alumno
app.get('/alumnos', (req, res) => {
    const query = 'SELECT * FROM Alumno';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json(results);
    });
});

app.post('/alumnos', (req, res) => {
    const { nombre_completo, correo, password, matricula, grupo } = req.body;
    const query = 'INSERT INTO Alumno (nombre_completo, correo, password, matricula, grupo) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre_completo, correo, password, matricula, grupo], (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json({ message: 'Alumno creado', id: results.insertId });
    });
});

app.put('/alumnos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_completo, correo, password, matricula, grupo } = req.body;
    const query = 'UPDATE Alumno SET nombre_completo = ?, correo = ?, password = ?, matricula = ?, grupo = ? WHERE id = ?';
    db.query(query, [nombre_completo, correo, password, matricula, grupo, id], (err) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json({ message: 'Alumno actualizado' });
    });
});

app.delete('/alumnos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Alumno WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json({ message: 'Alumno eliminado' });
    });
});

// Endpoints para la tabla Administrador
app.get('/administradores', (req, res) => {
    const query = 'SELECT * FROM Administrador';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json(results);
    });
});

app.post('/administradores', (req, res) => {
    const { nombre_completo, matricula, password } = req.body;
    const query = 'INSERT INTO Administrador (nombre_completo, matricula, password) VALUES (?, ?, ?)';
    db.query(query, [nombre_completo, matricula, password], (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json({ message: 'Administrador creado', id: results.insertId });
    });
});

// Endpoints para la tabla Libro
app.get('/libros', (req, res) => {
    const query = 'SELECT * FROM Libro';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json(results);
    });
});

app.post('/libros', (req, res) => {
    const { ISBN, titulo, autor, stock } = req.body;
    const query = 'INSERT INTO Libro (ISBN, titulo, autor, stock) VALUES (?, ?, ?, ?)';
    db.query(query, [ISBN, titulo, autor, stock], (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json({ message: 'Libro creado', id: results.insertId });
    });
});

// Endpoints para la tabla Prestamo
app.get('/prestamos', (req, res) => {
    const query = 'SELECT * FROM Prestamo';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json(results);
    });
});

app.post('/prestamos', (req, res) => {
    const { fechaPrestamo, fechaDevolucion, matricula, ISBN } = req.body;
    const query = 'INSERT INTO Prestamo (fechaPrestamo, fechaDevolucion, matricula, ISBN) VALUES (?, ?, ?, ?)';
    db.query(query, [fechaPrestamo, fechaDevolucion, matricula, ISBN], (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.json({ message: 'Préstamo creado', id: results.insertId });
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a la API del Sistema Escolar');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});