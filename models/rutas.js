const { Schema, model } = require('mongoose')

const rutasSchema = Schema({

    nombre: {
        type: String,
        required: true
    }, 
    ciudad: {
        type: String,
        required: true,
        unique: true
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

rutasSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Rutas', rutasSchema );