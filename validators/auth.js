const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const validateAuth = [
    check('name', 'El nombre no pude estar vacio')
        .exists()
        .not()
        .isEmpty(),
    check('rol', 'El rol no pude estar vacio')
        .exists()
        .not()
        .isEmpty(),
    check('email', 'El email no es valido')
        .exists()
        .isEmail(),
    check('password', 'Minimo 8 caracteres Maximo 15 Al menos una letra mayúscula Al menos una letra minucula Al menos un dígito No espacios en blanco Al menos 1 caracter especial')
        .exists()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/),
        (req, res, next) => {
            validarCampos(req, res, next)
        }
]

const validateLogin = [
    check('email', 'El email no es valido')
        .exists()
        .isEmail(),
    check('password', 'Minimo 8 caracteres Maximo 15 Al menos una letra mayúscula Al menos una letra minucula Al menos un dígito No espacios en blanco Al menos 1 caracter especial')
        .exists()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/),
        (req, res, next) => {
            validarCampos(req, res, next)
        }
]

module.exports = {
    validateAuth,
    validateLogin
}