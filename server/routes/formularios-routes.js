const express = require('express');
const router = express.Router();

const formulariosControllers = require('../controllers/formularios-controllers');

router.post('/obtenerVarios', formulariosControllers.obtenerFormularios);
router.post('/obtenerUno', formulariosControllers.obtenerFormulario);
router.post('/crear', formulariosControllers.crearFormulario);
router.post('/borrar', formulariosControllers.borrarFormulario);
router.post('/actualizar', formulariosControllers.actualizarFormulario);
router.post('/enviarCorreo', formulariosControllers.mandarCorreo);

module.exports = router;