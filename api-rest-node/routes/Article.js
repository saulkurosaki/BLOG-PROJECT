const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/Article');

//Rutas de Prueba
router.get('/ruta-de-prueba', ArticleController.test);
router.get('/curso', ArticleController.curso);

//Rutas Útiles
router.post('/crear', ArticleController.crear);
router.get('/articulos/:ultimos?', ArticleController.listar);
router.get('/articulo/:id', ArticleController.uno);
router.delete('/articulo/:id', ArticleController.borrar);
router.put('/articulo/:id', ArticleController.editar);


module.exports = router;