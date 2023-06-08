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

//RUTAS
const rutas_article = require('./routes/Article');

app.use('/api', rutas_article);

//Rutas de PRUEBA
app.get('/', (req, res) => {
    return res.status(200).send(
        '<h1>Empezando a crear una Api Rest con Node.js</h1>'
    );
});

app.get('/probando', (req, res) => {
    return res.status(200).send([
        {
            curso: 'Master en MERN Stack',
            autor: 'Saul Paredes Fano',
            coautor: 'Chanchito Feliz',
        },
        {
            curso: 'Master en MERN Stack',
            autor: 'Saul Paredes Fano',
            coautor: 'Chanchito Feliz',
        },
    ]);
});

//Crear el servidor y escuchar peticiones http
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});