/*
    Productos Routes
    /api/customers
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getCustomers, crearCustomers, actualizarCustomer, eliminarCustomer } = require('../controllers/customers');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener eventos 
router.get('/', getCustomers );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('empresa','EL nombre de la empresa es obligatorio').not().isEmpty(),
        check('celular','EL número de celular es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCustomers
);

// Actualizar Evento
router.put(
    '/:id', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('empresa','EL nombre de la empresa es obligatorio').not().isEmpty(),
        check('celular','EL número de celular es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCustomer
);

// Borrar evento
router.delete('/:id', eliminarCustomer );

module.exports = router;