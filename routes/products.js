/*
    Productos Routes
    /api/products
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/products');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener eventos 
router.get('/', getProductos );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('cantidad','El nombre es obligatorio').not().isEmpty(),
        check('precio','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearProducto
);

// Actualizar Evento
router.put(
    '/:id', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('cantidad','El nombre es obligatorio').not().isEmpty(),
        check('precio','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarProducto 
);

// Borrar evento
router.delete('/:id', eliminarProducto );

module.exports = router;