const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const validateRutas = [
    check('nombre', 'El nombre no puede estar vacio')
        .exists()
        .not()
        .isEmpty(),
    check('ciudad', 'El rol no puede estar vacio')
        .exists()
        .not()
        .isEmpty(),
    check('descripcion', 'La descripción no puede estar varcia')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validarCampos(req, res, next)
    }
]

module.exports = {
    validateRutas
}