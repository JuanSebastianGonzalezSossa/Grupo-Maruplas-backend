const { response } = require('express');
const Producto = require('../models/products');

const getProductos = async (req, res = response) => {

    const productos = await Producto.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        productos
    });
}

const crearProducto = async (req, res = response) => {

    const producto = new Producto(req.body);

    try {

        producto.user = req.uid;

        const productoGuardado = await producto.save();

        res.json({
            ok: true,
            evento: productoGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarProducto = async (req, res = response) => {

    const productoId = req.params.id;
    const uid = req.uid;

    try {

        const producto = await Producto.findById(productoId);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if (producto.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoProducto = {
            ...req.body,
            user: uid
        }

        const productoActualizado = await Producto.findByIdAndUpdate(productoId, nuevoProducto, { new: true });

        res.json({
            ok: true,
            evento: productoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarProducto = async (req, res = response) => {

    const productoId = req.params.id;
    const uid = req.uid;

    try {

        const producto = await Producto.findById(eventoId);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if (producto.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Producto.findByIdAndDelete(eventoId);

        res.json({ ok: true });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}