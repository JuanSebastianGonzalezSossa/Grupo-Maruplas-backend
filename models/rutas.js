const { Schema, model } = require('mongoose')

const rutasSchema = Schema({

    nombre: {
        type: String,
        required: true
    }, 
    ciudad: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Rutas', rutasSchema );