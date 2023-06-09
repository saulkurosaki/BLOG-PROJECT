const fs = require('fs');
const { validarArticulo } = require('../helpers/validar');
const Article = require('../models/Article');

const test = (req, res) => {
    return res.status(200).json({
        mensaje: 'soy una acción de prueba en mi controlador de articulos'
    });
};

const curso = (req, res) => {
    return res.status(200).json([
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
};

const crear = (req, res) => {

    //Recoger los parámetros por POST a guardar
    let parametros = req.body;

    //Validar los datos
    try {
        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            mensaje: 'Faltan datos por enviar',
        });
    }

    //Crear el objeto a guardar y pasarle los parámetros recibidos
    const article = new Article(parametros);

    //Guardar el articulo en la Base de Datos
    article.save().then((articuloGuardado) => {

        //Si existe un error
        if (!articuloGuardado) {
            return res.status(400).json({
                status: 'Error',
                mensaje: 'No se ha guardado el articulo',
            });
        };

        //Devolver el resultado
        return res.status(200).json({
            status: 'success',
            article: articuloGuardado,
            mensaje: 'Articulo guardado con éxito',
        });

    });

};

const listar = (req, res) => {

    let consulta = Article.find({});

    if (req.params.ultimos) {
        consulta.limit(3);
    };


    consulta.sort({ fecha: -1 }) //Orden descendente (-1)
        .exec().then((articulos) => {

            //Caso de error
            if (!articulos) {
                return res.status(404).json({
                    status: 'Error',
                    mensaje: 'No se ha encontrado articulos',
                });
            };

            //Caso exitoso
            return res.status(200).send({
                status: 'success',
                contador: articulos.length,
                articulos,
            });

        });

};

const uno = (req, res) => {
    //Recoger un id por la url
    let id = req.params.id;

    //Buscar el articulo
    Article.findById(id).then((articulo) => {

        //Si no existe devolver error
        if (!articulo) {
            return res.status(404).json({
                status: 'Error',
                mensaje: 'No se ha encontrado articulo',
            });
        };

        //Si existe devolver resultado
        return res.status(200).json({
            status: 'success',
            articulo,
        });

    });

};

const borrar = (req, res) => {

    let articuloId = req.params.id;

    Article.findOneAndDelete({ _id: articuloId }).then((articuloBorrado) => {

        if (!articuloBorrado) {
            return res.status(500).json({
                status: 'Error',
                mensaje: 'Error al borrar el articulo',
            });
        };

        return res.status(200).json({
            status: 'success',
            articulo: articuloBorrado,
            mensaje: 'El articulo ha sido borrado con éxito',
        });

    });

};

const editar = (req, res) => {
    //Recoger id articulo a editar
    let articuloId = req.params.id;

    //Recoger datos de body
    let parametros = req.body;

    //Validar datos
    try {
        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            mensaje: 'Faltan datos por enviar',
        });
    }

    //Buscar y Actualizar
    Article.findOneAndUpdate({ _id: articuloId }, parametros, { new: true }).then((articuloActualizado) => {

        //En caso de Error
        if (!articuloActualizado) {
            return res.status(500).json({
                status: 'Error',
                mensaje: 'Error al actualizar',
            });
        };

        //Devolver respuesta
        return res.status(200).json({
            status: 'success',
            articulo: articuloActualizado,
        });

    });

};

const subir = (req, res) => {
    //Recoger el fichero de imagen subido
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: 'Error',
            mensaje: 'Petición Invalida',
        });
    };

    //Conseguir el Nombre del archivo
    let archivo = req.file.originalname;

    //Extension del archivo
    let archivo_split = archivo.split('\.');
    let extension = archivo_split[1];

    //Comprobar la extension correcta
    if (extension != 'png' && extension != 'jpg' &&
        extension != 'jpeg' && extension != 'gif') {
        //Borrar archivo y dar respuesta
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: 'Error',
                mensaje: 'Imagen invalida',
            });
        });

    } else {
        //Recoger id articulo a editar
        let articuloId = req.params.id;

        //Buscar y Actualizar
        Article.findOneAndUpdate({ _id: articuloId }, {imagen: req.file.filename}, { new: true }).then((articuloActualizado) => {

            //En caso de Error
            if (!articuloActualizado) {
                return res.status(500).json({
                    status: 'Error',
                    mensaje: 'Error al actualizar',
                });
            };

            //Devolver respuesta
            return res.status(200).json({
                status: 'success',
                articulo: articuloActualizado,
                fichero: req.file,
            });

        });

    };

};

module.exports = {
    test,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
};