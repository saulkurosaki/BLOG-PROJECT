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

module.exports = {
    test,
    curso,
};