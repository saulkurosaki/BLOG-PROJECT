const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');

//Inicializar App
console.log('App Inicializada');

//Conectar a la base de datos
connection();

//Crear servidor Node
const app = express();

//Configurar Middleware de Cors (Evitar problema de dominios cruzados)
app.use(cors());

//Convertir body a Objeto Json
app.use(express.json());

//Crear rutas

//Crear el servidor y escuchar peticiones http
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});