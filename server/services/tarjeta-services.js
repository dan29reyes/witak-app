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

async function obtenerTarjetas(idLista) {
  try{
    let tarjetas = await knex.select('*').from('tarjetas').where('id_lista', idLista)
    tarjetas = JSON.stringify(tarjetas);
    return JSON.parse(tarjetas);
  } catch (error) {
    console.log('No se pudo obtener las tarjetas ', error);
  }
}

async function crearTarjeta(tarjeta) {
  try{
    await knex('tarjetas').insert({
      nombre_tarjeta: tarjeta.nombre_tarjeta,
      descripcion_tarjeta: tarjeta.descripcion_tarjeta,
      posicion_tarjeta: tarjeta.posicion_tarjeta,
      id_lista: tarjeta.id_lista,
    });
  } catch (error) {
    console.log('No se pudo crear la tarjeta ', error);
  }
}

async function borrarTarjeta(idTarjeta) {
  try{
    await knex('tarjetas').where({id_tarjeta: idTarjeta}).del();
  } catch (error) {
    console.log('No se pudo borrar la tarjeta ', error);
  }
}

async function actualizarTarjeta(tarjeta) {
  try{
    await knex('tarjetas').
    where({id_tarjeta: tarjeta.id_tarjeta}).
    update({
      nombre_tarjeta: tarjeta.nombre_tarjeta,
      descripcion_tarjeta: tarjeta.descripcion_tarjeta,
      posicion_tarjeta: tarjeta.posicion_tarjeta,
      id_lista: tarjeta.id_lista,
    });
  } catch (error) {
    console.log('No se pudo actualizar la tarjeta ', error);
  }
}

module.exports = {
  obtenerTarjetas,
  crearTarjeta,
  borrarTarjeta,
  actualizarTarjeta,
}