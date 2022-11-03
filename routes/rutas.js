/*
    Productos Routes
    /api/rutas
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getRutas, crearRutas, actualizarRutas, eliminarRuta } = require('../controllers/rutas');
const { validateRutas } = require('../validators/rutas');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);


// Obtener eventos 
router.get('/', getRutas);

// Crear un nuevo evento
router.post('/', validateRutas, crearRutas);

// Actualizar Evento
router.put('/:id', validateRutas, actualizarRutas);

// Borrar evento
router.delete('/:id', eliminarRuta);

module.exports = router;