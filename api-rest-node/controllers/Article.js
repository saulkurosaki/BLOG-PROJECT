const validator = require('validator');
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
    let parámetros = req.body;

    //Validar los datos
    try {

        let validar_titulo = !validator.isEmpty(parámetros.titulo) &&
                              validator.isLength(parámetros.titulo, {min: 5 , max: undefined});
        let validar_contenido = !validator.isEmpty(parámetros.contenido);

        if(!validar_titulo || !validar_contenido){
            throw new Error('No se se ha validado la información');
        }
        
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            mensaje: 'Faltan datos por enviar',
        });       
    }

    //Crear el objeto a guardar y pasarle los parámetros recibidos
    const article = new Article(parámetros);

    //Guardar el articulo en la Base de Datos
    article.save().then((articuloGuardado) => {

        //Si existe un error
        if(!articuloGuardado){
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

    let consulta = Article.find({})
                          .sort({fecha: -1}) //Orden descendente (-1)
                          .exec().then((articulos) => {

        //Caso de error
        if(!articulos){
            return res.status(400).json({
                status: 'Error',
                mensaje: 'No se ha encontrado articulos',
            });          
        };

        //Caso exitoso
        return res.status(200).send({
            status: 'success',
            articulos,
        });

    });

};

module.exports = {
    test,
    curso,
    crear,
    listar,
};