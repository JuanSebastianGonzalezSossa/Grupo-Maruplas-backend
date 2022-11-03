const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const validateProductos = [
    check('nombre', 'El nombre no puede estar vacio')
        .exists()
        .not()
        .isEmpty(),
    check('cantidad', 'La cantidad no puede estar vacia')
        .exists()
        .isNumeric(),
    check('cantidad', 'La cantidad puede tener maximo 3 caracteres')
        .isLength({ max: 3 }),
    check('precio', 'El precio no puede estar vacio')
        .exists()
        .isNumeric(),
    check('precio', 'El precio puede tener maximo 3 caracteres')
        .isLength({ max: 9 }),
    check('descripcion', 'La descripción no puede estar varcia')
        .exists()
        .not()
        .isEmpty(),
    check('referencia', 'La descripción no puede estar varcia')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validarCampos(req, res, next)
    }
]

module.exports = {
    validateProductos
}