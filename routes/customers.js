/*
    Productos Routes
    /api/customers
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getCustomers, crearCustomers, actualizarCustomer, eliminarCustomer } = require('../controllers/customers');
const { validateCustomers } = require('../validators/customers')

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);


// Obtener clientes
router.get('/', getCustomers);

// Crear un nuevo cliente
router.post('/', validateCustomers, crearCustomers);

// Actualizar Cliente
router.put('/:id', validateCustomers, actualizarCustomer);

// Borrar Cliente
router.delete('/:id', eliminarCustomer);

module.exports = router;