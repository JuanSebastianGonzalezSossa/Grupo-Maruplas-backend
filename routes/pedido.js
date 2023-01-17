/*
    Pedidos Routes
    /api/pedidos
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getPedidos, crearPedido, eliminarPedido } = require('../controllers/pedido');
const router = Router();
//const { validateProductos } = require('../validators/products')
// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);


// Obtener Pedidos
router.get('/', getPedidos);

// Crear un pedido 
router.post('/', crearPedido);

// Borrar Pedido
router.delete('/:id', eliminarPedido);

module.exports = router;