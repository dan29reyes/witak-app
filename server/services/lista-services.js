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

async function obtenerListas(id_tablero){
  try{
    let listas = await knex.select("*").from("listas").where("id_tablero", id_tablero);
    listas = JSON.stringify(listas);
    return JSON.parse(listas);
  }catch(error){
    console.log("Error obteniendo las listas", error);
  }
}

async function crearLista(lista){
  try{
    await knex("listas").insert({
      nombre_lista: lista.nombre_lista,
      posicion_lista: lista.posicion_lista,
      id_tablero: lista.id_tablero,
    });
  }catch(error){
    console.error("Error insertando la lista", error);
  }
}

async function borrarLista(id_lista){
  try{
    const id_tarjetas = await knex.select("id_tarjeta").from("tarjetas").where({id_lista: id_lista});
    for(let i = 0; i < id_tarjetas.length; i++){
      await knex("tarjetas").where({id_tarjeta: id_tarjetas[i].id_tarjeta}).del();
    }
    await knex("listas").where({id_lista: id_lista}).del();
  }catch(error){
    console.error("Error borrando la lista", error);
  }
}

async function actualizarLista(lista){
  try{
    await knex("listas").
    where({id_lista: lista.id_lista}).
    update({
      nombre_lista: lista.nombre_lista,
      posicion_lista: lista.posicion_lista,
      id_tablero: lista.id_tablero,
    });
  }catch(error){
    console.error("Error actualizando la lista", error);
  }
}

module.exports = {
  obtenerListas,
  crearLista,
  borrarLista,
  actualizarLista,
};