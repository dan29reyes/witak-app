const express = require('express')
const router = express.Router();

const tableroController = require('../controllers/tableros-controllers');

router.post('/obtener',tableroController.obtenerTableros);
router.post('/crear', tableroController.crearTablero);
router.post('/borrar', tableroController.borrarTablero);
router.post('/actualizar', tableroController.actualizarTablero)

module.exports = router;