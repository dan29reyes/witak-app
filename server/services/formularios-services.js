require('dotenv').config();
const nodemailer = require("nodemailer");

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

async function obtenerFormularios(idUsuario){
  try{
    let formularios = await knex("formularios").where({id_usuario: idUsuario});
    formularios = JSON.stringify(formularios);
    return JSON.parse(formularios);
  }catch(error){
    console.log("No se pudo obtener los formularios", error);

  }
}

async function obtenerFormulario(idFormulario){
  try{
    let formulario = await knex("formularios").where({id_formulario: idFormulario});
    formulario = JSON.stringify(formulario);
    return JSON.parse(formulario);
  }catch(error){
    console.log("No se pudo obtener el formulario", error);
  }
}

async function crearFormulario(formulario){
  try{
    await knex("formularios").insert({
      nombre_formulario: formulario.nombre_formulario,
      objetivo_formulario: formulario.objetivo_formulario,
      descripcion_formulario: formulario.descripcion_formulario,
      publico_formulario: formulario.publico_formulario,
      tono_formulario: formulario.tono_formulario,
      id_usuario: formulario.id_usuario,
      fecha_limite: formulario.fecha_limite,
    });
  }catch(error){
    console.log("No se pudo crear el formulario", error);
    return false;
  }
}

async function borrarFormulario(idFormulario){
  try{
    await knex("formularios").where({id_formulario: idFormulario}).del();
  }catch(error){
    console.log("No se pudo borrar el formulario", error);
  }
}

async function actualizarFormulario(formulario){
  try{
    await knex("formularios").where({id_formulario: formulario.id_formulario})
    .update({
      nombre_formulario: formulario.nombre_formulario,
      objetivo_formulario: formulario.objetivo_formulario,
      descripcion_formulario: formulario.descripcion_formulario,
      publico_formulario: formulario.publico_formulario,
      tono_formulario: formulario.tono_formulario,
      id_usuario: formulario.id_usuario,
      fecha_limite: formulario.fecha_limite,
    });
  }catch(error){
    console.log("No se pudo actualizar el formulario", error);
  }
}

async function mandarCorreo(from, to, asunto, text, html, attachments){
  try{
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: from,
      to: to,
      subject: asunto,
      text: text,
      html: html,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);
  }catch(error){
    console.log("No se pudo enviar el correo", error);
  }
}

module.exports = {
  obtenerFormularios,
  obtenerFormulario,
  crearFormulario,
  borrarFormulario,
  actualizarFormulario,
  mandarCorreo,
};