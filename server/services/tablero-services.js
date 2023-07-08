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
        let tableros = await knex.select('*').from('tableros').where('user_id',userId);
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
        })
    }catch(error){
        console.error("Error insertando el tablero: ",error);
    }
}

async function borrarTablero(idTablero){
    try{
        const listId = await knex.select('id_lista').from('listas').where({id_tablero: idTablero});
        for(let i = 0; i < listId.length; i++){
            const id_tarjetas = await knex.select('id_tarjeta').from('tarjetas').where({id_tarjeta: listId[i].id_lista});
            for(let i = 0; i < id_tarjetas.length; i++){
                await knex('tarjetas').where({id_tarjeta: id_tarjetas[i].id_tarjeta}).del();
            }
            await knex('listas').where({id_lista: listId[i].id_list}).del();
        }
        await knex('tableros').where({id_board: idTablero}).del();
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