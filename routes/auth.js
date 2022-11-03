/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validateAuth, validateLogin } = require('../validators/auth');

const router = Router();



router.post(
    '/new',
    //Validamos los campos para crear un usuario
    validateAuth,
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