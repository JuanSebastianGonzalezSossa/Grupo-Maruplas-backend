/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken, getUsuarios } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validateAuth, validateLogin } = require('../validators/auth');

const router = Router();

router.get(
    '/',
    getUsuarios
);

router.post(
    '/new',
    //Validamos los campos para crear un usuario
    validateAuth,
    validarJWT,
    crearUsuario
);

router.post(
    '/',
    //Validamos los campos para logearse en la aplicación
    validateLogin,
    loginUsuario
);


router.get('/renew', validarJWT, revalidarToken);


module.exports = router;