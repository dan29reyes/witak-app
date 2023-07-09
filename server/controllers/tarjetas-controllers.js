const tarjetasServices = require('../services/tarjeta-services');

async function obtenerTarjetas(req, res){
    const { id_lista } = req.body;
    try {
        const tarjetas = await tarjetasServices.obtenerTarjetas(id_lista);
        res.status(200).send(tarjetas);
    } catch (e) {
        res.status(500).send({
        error: e.toString(),
        });
    }
}

async function crearTarjeta(req, res){
    const { nombre_tarjeta, descripcion_tarjeta, posicion_tarjeta, id_lista } = req.body;
    try {
        if (typeof nombre_tarjeta === "string" && typeof descripcion_tarjeta === "string"
         && typeof posicion_tarjeta === "number" && typeof id_lista === "number") {
            await tarjetasServices.crearTarjeta(req.body);
            const tarjetas = await tarjetasServices.obtenerTarjetas(id_lista);
            res.status(200).send(tarjetas);
        } else {
            res.status(400).send({
                error: e.toString(),
            });
        }
    }
    catch (e) {
        res.status(500).send({
            error: e.toString(),
        });
    }
}

async function borrarTarjeta(req, res){
    const { id_tarjeta, id_lista } = req.body;
    try {
        if (typeof id_tarjeta === "number" && typeof id_lista === "number") {
            await tarjetasServices.borrarTarjeta(id_tarjeta);
            const tarjetas = await tarjetasServices.obtenerTarjetas(id_lista);
            res.status(200).send(tarjetas);
        } else {
            res.status(400).send({
                error: e.toString(),
            });
        }
    }
    catch (e) {
        res.status(500).send({
            error: e.toString(),
        });
    }
}

async function actualizarTarjeta(req, res){
    const { id_tarjeta, nombre_tarjeta, descripcion_tarjeta, posicion_tarjeta, id_lista } = req.body;
    try {
        if (typeof id_tarjeta === "number" && typeof nombre_tarjeta === "string" && typeof descripcion_tarjeta === "string"
         && typeof posicion_tarjeta === "number" && typeof id_lista === "number") {
            await tarjetasServices.actualizarTarjeta(req.body);
            const tarjetas = await tarjetasServices.obtenerTarjetas(id_lista);
            res.status(200).send(tarjetas);
        } else {
            res.status(400).send({
                error: e.toString(),
            });
        }
    }
    catch (e) {
        res.status(500).send({
            error: e.toString(),
        });
    }
}

module.exports = {
    obtenerTarjetas,
    crearTarjeta,
    borrarTarjeta,
    actualizarTarjeta,
}