const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/Article');

//Rutas de Prueba
router.get('/ruta-de-prueba', ArticleController.test);
router.get('/curso', ArticleController.curso);

//Rutas Útiles
router.post('/crear', ArticleController.crear);


module.exports = router;