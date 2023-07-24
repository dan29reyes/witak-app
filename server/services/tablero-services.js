require('dotenv').config();

const knex = require("knex")({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
  }
);

async function obtenerTableros(userId) {
    try{
        let tableros = await knex.select('*').from('tableros').where('id_usuario',userId);
        tableros = JSON.stringify(tableros);
        return JSON.parse(tableros);
    }catch(error){
        console.log('Error obteniendo los boards',error)
    }
}

async function crearTablero(tablero){
    try{
        await knex('tableros').insert({
            nombre_tablero: tablero.nombre_tablero,
            descripcion_tablero: tablero.descripcion_tablero,
            fecha_limite: tablero.fecha_limite,
            id_usuario: tablero.id_usuario,
            columna_referencia: tablero.columna_referencia,
        })
    }catch(error){
        console.error("Error insertando el tablero: ",error);
    }
}

async function borrarTablero(idTablero){
    try{
        await knex('tableros').where({id_tablero: idTablero}).del();
    }catch(error){
        console.error('Error borrando el tablero', error);
    }
}

async function actualizarTablero(tablero){
    try{
        await knex('tableros').
        where({id_tablero: tablero.id_tablero}).
        update({
            nombre_tablero: tablero.nombre_tablero,
            descripcion_tablero: tablero.descripcion_tablero,
            fecha_limite: tablero.fecha_limite,
            columna_referencia: tablero.columna_referencia,
        })
    }catch(error){
        console.error('Error actualizando el tablero', error);
    }
}

module.exports = {
    obtenerTableros,
    crearTablero,
    borrarTablero,
    actualizarTablero,
}