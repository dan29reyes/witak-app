const express = require('express');
const router = express.Router();

const tarjetasControllers = require('../controllers/tarjetas-controllers');

router.post('/obtener', tarjetasControllers.obtenerTarjetas);
router.post('/crear', tarjetasControllers.crearTarjeta);
router.post('/borrar', tarjetasControllers.borrarTarjeta);
router.post('/actualizar', tarjetasControllers.actualizarTarjeta);

module.exports = router;