const tablerosServices = require('../services/tablero-services');

async function obtenerTableros(req, res){
  const { id_usuario } = req.body;
  try {
    const tableros = await tablerosServices.obtenerTableros(id_usuario);
    res.send(tableros);
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

async function crearTablero(req, res){
  const { nombre_tablero, id_usuario, descripcion_tablero, fecha_limite } = req.body;
  try {
    if (typeof nombre_tablero === "string" && typeof descripcion_tablero === "string"
     && typeof id_usuario === "number" && typeof fecha_limite === "string") {
      const idTablero = await tablerosServices.crearTablero(req.body);
      const tableros = await tablerosServices.obtenerTableros(id_usuario);
      res.send({ idTablero, tableros });
    } else {
      res.status(400).send({
        error: e.toString(),
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

async function borrarTablero(req, res){
    const { id_tablero, id_usuario } = req.body;
    try {
        if (typeof id_tablero === "number" && typeof id_usuario === "number") {
            const idTablero = await tablerosServices.borrarTablero(id_tablero);
            const tableros = await tablerosServices.obtenerTableros(id_usuario);
            res.send({ idTablero, tableros });
        } else {
            res.status(400).send({
                error: e.toString(),
            });
        }
    } catch (e) {
      res.status(500).send({
        error: e.toString(),
      });
    }
  }

async function actualizarTablero(req, res){
  const { nombre_tablero, descripcion_tablero, fecha_limite, id_tablero, id_usuario } = req.body;
  try {
    if (typeof nombre_tablero === "string" && typeof descripcion_tablero === "string"
     && typeof fecha_limite === "string" && typeof id_tablero === "number" && typeof id_usuario === "number") {
      const idTablero = await tablerosServices.actualizarTablero(req.body);
      const tableros = await tablerosServices.obtenerTableros(id_usuario);
      res.send({ idTablero, tableros });
    }else{
        res.status(400).send({
            error: e.toString(),
        });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

module.exports = {
    obtenerTableros,
    crearTablero,
    borrarTablero,
    actualizarTablero,
};