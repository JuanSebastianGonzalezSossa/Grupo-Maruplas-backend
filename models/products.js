const { Schema, model, Number } = require('mongoose');

const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    imagenURL: {
        type: String,        
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    referencia: {
        type: String,
        required: true,
        unique: true
    },
    fechaCreate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

ProductoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Producto', ProductoSchema );

