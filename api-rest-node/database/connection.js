const mongoose = require('mongoose');

const connection = async() => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BLOG_PROYECTO');
        console.log('La Base de Datos ha sido conectada correctamente');
        //Parámetros a pasar ante un fallo:
            //useNewUrlParser: true
            //useUnifiedTopology: true
            //useCreateIndex: true 
    } catch (error) {
        console.log(error);
        throw new Error('No se ha podido conectar a la Base de Datos');
    }

};

module.exports = {
    connection
};