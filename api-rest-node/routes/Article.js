const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/Article');
const multer = require('multer');

const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './imagenes/articulos');
    },
    filename: function(req, file, cb){
        cb(null, 'articulo' + Date.now() + file.originalname);
    },
});

const subidas = multer({storage: almacenamiento});

//Rutas de Prueba
router.get('/ruta-de-prueba', ArticleController.test);
router.get('/curso', ArticleController.curso);

//Rutas Útiles
router.post('/crear', ArticleController.crear);
router.get('/articulos/:ultimos?', ArticleController.listar);
router.get('/articulo/:id', ArticleController.uno);
router.delete('/articulo/:id', ArticleController.borrar);
router.put('/articulo/:id', ArticleController.editar);
router.post('/subir-imagen/:id', [subidas.single('file0')], ArticleController.subir);
router.get('/imagen/:fichero', ArticleController.imagen);


module.exports = router;