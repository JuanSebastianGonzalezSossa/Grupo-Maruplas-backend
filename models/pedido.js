const { Schema, model, Number } = require('mongoose');

const PedidoSchema = Schema({

    Cliente: {
        type: String,
        required: true
    },
    Productos: {
        type: Array,
        required: true        
    },
    Ruta: {
        type: String,
        required: true
    },
    precioTotal: {
        type: String,
        required: true
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

PedidoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Pedido', PedidoSchema );

