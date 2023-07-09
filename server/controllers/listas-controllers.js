const listaServices = require('../services/lista-services');

async function obtenerListas(req, res){
    const { nombre_lista, posicion_lista, id_tablero } = req.body;
    try{
        if (typeof id_tablero === "number"){
            const listas = await listaServices.obtenerListas(id_tablero);
            res.send(listas);
        }else{
            res.status(400).send({
                error: e.toString(),
            });
        }
    }catch(error){
        console.log("Error obteniendo las listas", error);
    }
}

async function crearLista(req, res){
    const { nombre_lista, posicion_lista, id_tablero } = req.body;
    try{
        if (typeof nombre_lista === "string" && typeof posicion_lista === "number" && typeof id_tablero === "number"){
            await listaServices.crearLista(req.body);
            const listas = await listaServices.obtenerListas(id_tablero);
            res.status(200).send(listas);
        }else{
            res.status(400).send({
                error: e.toString(),
            });
        }
    }catch(error){
        console.log("Error creando la lista", error);
    }
}

async function borrarLista(req, res){
    const { id_lista, id_tablero } = req.body;
    try{
        if (typeof id_lista === "number" && typeof id_tablero === "number"){
            await listaServices.borrarLista(id_lista);
            const listas = await listaServices.obtenerListas(id_tablero);
            res.status(200).send(listas);
        }else{
            res.status(400).send({
                error: e.toString(),
            });
        }
    }catch(error){
        console.log("Error borrando la lista", error);
    }
}

async function actualizarLista(req, res){
    const { nombre_lista, posicion_lista, id_lista, id_tablero } = req.body;
    try{
        if (typeof nombre_lista === "string" && typeof posicion_lista === "number" && typeof id_lista === "number" && typeof id_tablero === "number"){
            await listaServices.actualizarLista(req.body);
            const listas = await listaServices.obtenerListas(id_tablero);
            res.status(200).send(listas);
        }else{
            res.status(400).send({
                error: e.toString(),
            });
        }
    }catch(error){
        console.log("Error actualizando la lista", error);
    }
}

module.exports = {
    obtenerListas,
    crearLista,
    borrarLista,
    actualizarLista,
};