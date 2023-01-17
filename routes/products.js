/*
    Productos Routes
    /api/products
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/products');
const router = Router();
const { validateProductos } = require('../validators/products')
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);


// Obtener eventos 
router.get('/', getProductos);

// Crear un nuevo evento
router.post('/', validateProductos, crearProducto);

// Actualizar Evento
router.put('/:id', validateProductos, actualizarProducto);

router.put('/uno/:id', actualizarProducto);

// Borrar evento
router.delete('/:id', eliminarProducto);

module.exports = router;