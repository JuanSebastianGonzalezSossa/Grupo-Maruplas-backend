const { Schema, model, Number } = require('mongoose')

const CustomerSchema = Schema({

    nombre: {
        type: String,
        required: true
    }, 
    empresa: {
        type: String,
        required: true
    },
    celular: {
        type: Number,
        required: true
    },
    correo: {
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

module.exports = model('Customer', CustomerSchema );