const { response } = require('express');
const Pedido = require('../models/pedido');

const getPedidos = async (req, res = response) => {

    const pedidos = await Pedido.find()
        .populate('user');

    res.json({
        ok: true,
        pedidos
    });
}

const crearPedido = async (req, res = response) => {

    const uid = req.uid;

    try {
        let pedido = await Pedido.findOne({ uid });

        if (pedido) {
            return res.status(400).json({
                ok: false,
                msg: 'El pedido ya existe'
            });
        }

        pedido = new Pedido(req.body);

        try {

            pedido.user = req.uid;

            const pedidoGuardado = await pedido.save();

            res.json({
                ok: true,
                pedido: pedidoGuardado
            })


        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const eliminarPedido = async (req, res = response) => {

    const pedidoId = req.params.id;
    const uid = req.uid;

    try {

        const pedido = await Pedido.findById(pedidoId);

        if (!pedido) {
            return res.status(404).json({
                ok: false,
                msg: 'Pedido no existe por ese id'
            });
        }

        if (pedido.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este Pedido'
            });
        }


        await Pedido.findByIdAndDelete(pedidoId);
        const pedidos = await Pedido.find()
        .populate('user');

        res.json({ ok: true, pedidos });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getPedidos,
    crearPedido,
    eliminarPedido
}