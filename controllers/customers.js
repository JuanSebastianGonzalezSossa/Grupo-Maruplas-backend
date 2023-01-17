const { response } = require('express');
const Customer = require('../models/customers');

const getCustomers = async (req, res = response) => {

    const customers = await Customer.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        customers
    });
}

const crearCustomers = async (req, res = response) => {

    const { celular } = req.body;

    try {
        let customer = await Customer.findOne({ celular });

        if (customer) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto ya existe'
            });
        }

        customer = new Customer(req.body);

        try {

            customer.user = req.uid;

            const customerGuardado = await customer.save();

            res.json({
                ok: true,
                customer: customerGuardado
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

const actualizarCustomer = async (req, res = response) => {

    const customerId = req.params.id;
    const uid = req.uid;

    try {

        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({
                ok: false,
                msg: 'cliente no existe por ese id'
            });
        }

        if (customer.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este cliente'
            });
        }

        const nuevoCustomer = {
            ...req.body,
            user: uid
        }

        const customerActualizado = await Customer.findByIdAndUpdate(customerId, nuevoCustomer, { new: true });

        res.json({
            ok: true,
            customer: customerActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarCustomer = async (req, res = response) => {

    const customerId = req.params.id;
    const uid = req.uid;
    

    try {

        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({
                ok: false,
                msg: 'cliente no existe por ese id'
            });
        }

        if (customer.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este cliente'
            });
        }


        await Customer.findByIdAndDelete(customerId);
        const customers = await Customer.find()
        .populate('user', 'name');
        res.json({ ok: true, customers });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getCustomers,
    crearCustomers,
    actualizarCustomer,
    eliminarCustomer
}