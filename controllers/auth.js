const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res = response) => {

    const usuario = await Usuario.find()
        .populate('correo');

    res.json({
        ok: true,
        usuario
    });
}
 
const crearUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol: usuario.rol,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const actualizarUsuario = async (req, res = response) => {

    const usuarioId = req.params.id;
    const uid = req.uid;

    try {

        const usuario = await Usuario.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no existe por ese id'
            });
        }

        const nuevoUsuario = {
            ...req.body,
            user: uid
        }

        const UsuarioActualiado = await Usuario.findByIdAndUpdate(usuarioId, nuevoUsuario, { new: true });

         const usuarios = await Usuario.find()
        .populate('correo');

        res.json({
            ok: true,
            usuario: UsuarioActualiado,
            usuarios
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarUsuario = async (req, res = response) => {

    const usuarioId = req.params.id;

    try {

        const usuario = await Usuario.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no existe por ese id'
            });
        }


        await Usuario.findByIdAndDelete(usuarioId);
        const usuarios = await Usuario.find()
        .populate('correo');

        res.json({ ok: true, usuarios });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const revalidarToken = async (req, res = response ) => {

    const { uid, name } = req;

    const usuario = await Usuario.findOne({ name });

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        uid, name, rol: usuario.rol,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    getUsuarios,
    actualizarUsuario,
    eliminarUsuario
}