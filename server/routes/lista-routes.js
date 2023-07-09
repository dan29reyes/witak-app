const express = require('express');
const router = express.Router();

const listaControllers = require('../controllers/listas-controllers');

router.post('/obtener', listaControllers.obtenerListas);
router.post('/crear', listaControllers.crearLista);
router.post('/borrar', listaControllers.borrarLista);
router.post('/actualizar', listaControllers.actualizarLista);

module.exports = router;