const { Schema, model, Number } = require('mongoose')

const CustomerSchema = Schema({

    nombres: {
        type: String,
        required: true
    }, 
    apellidos: {
        type: String,
        required: true
    }, 
    empresa: {
        type: String,
        required: true
    },
    celular: {
        type: Number,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CustomerSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Customer', CustomerSchema );