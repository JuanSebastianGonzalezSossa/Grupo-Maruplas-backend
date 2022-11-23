const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const validateCustomers = [
    check('nombres', 'El nombre no puede estar vacio')
        .exists()
        .not()
        .isEmpty(),
    check('apellidos', 'El apellido no puede estar vacio')
        .exists()
        .not()
        .isEmpty(),
    check('empresa', 'El rol no puede estar vacio')
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