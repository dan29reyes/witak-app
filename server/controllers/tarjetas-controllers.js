const tarjetasService = require('../services/tarjetas-services');

const obtenerTableros = async (req, res) => {
  const { id_usuario } = req.body;
  try {
    const tableros = await tarjetasService.obtenerTableros(id_usuario);
    res.send(tableros);
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const crearTablero = async (req, res) => {
  const { nombre_tablero, id_usuario, descripcion_tablero, fecha_limite } = req.body;
  try {
    if (typeof nombre_tablero === "string" && typeof descripcion_tablero === "string"
     && typeof id_usuario === "number" && typeof fecha_limite === "string") {
      const idTablero = await tarjetasService.crearTablero(req.body);
      const tableros = await tarjetasService.obtenerTableros(id_usuario);
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

const borrarTablero = async (req, res) => {
    const { id_tablero, id_usuario } = req.body;
    try {
        if (typeof id_tablero === "number" && typeof id_usuario === "number") {
            const idTablero = await tarjetasService.borrarTablero(id_tablero);
            const tableros = await tarjetasService.obtenerTableros(id_usuario);
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

const actualizarTablero = async (req, res) => {
  const { nombre_tablero, descripcion_tablero, fecha_limite, id_tablero } = req.body;
  try {
    if (typeof nombre_tablero === "string" && typeof descripcion_tablero === "string"
     && typeof fecha_limite === "string" && typeof id_tablero === "number") {
      const idTablero = await tarjetasService.actualizarTablero(req.body);
      const tableros = await tarjetasService.obtenerTableros(id_usuario);
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