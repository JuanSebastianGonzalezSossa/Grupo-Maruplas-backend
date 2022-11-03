const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const validateCustomers = [
    check('nombre', 'El nombre no puede estar vacio')
        .exists()
        .not()
        .isEmpty(),
    check('empresa', 'El rol no puede estar vacio')
        .exists()
        .not()
        .isEmpty(),
    check('celular', 'El rol no puede estar vacio')
        .exists()
        .not()
        .isMobilePhone()
        .isEmpty(),
    check('email', 'El email no es valido')
        .exists()
        .isEmail(),
    check('descripcion', 'La descripción no puede estar varcia')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validarCampos(req, res, next)
    }
]

module.exports = {
    validateCustomers
}