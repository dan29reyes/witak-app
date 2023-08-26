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
      tamaño_formulario: formulario.tamaño_formulario,
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
      estado_formulario: formulario.estado_formulario,
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

async function uploadFile(fileContent, fileName) {
  const accessToken = process.env.TokenDropbox;

  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({
        path: `/uploads/${fileName}`,
        mode: 'add',
        autorename: true,
        mute: false,
      }),
    },
  };

  try {
    const response = await axios.post('https://content.dropboxapi.com/2/files/upload', fileContent, config);

    if (response.status === 200) {
      return 'Archivo subido a Dropbox exitosamente.';
    } else {
      throw new Error('Error al subir el archivo a Dropbox.');
    }
  } catch (error) {
    throw new Error('Hubo un error en la subida a Dropbox.');
  }
}

module.exports = {
  uploadFile,
  obtenerFormularios,
  obtenerFormulario,
  crearFormulario,
  borrarFormulario,
  actualizarFormulario,
  mandarCorreo,
};