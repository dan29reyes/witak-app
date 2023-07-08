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

const registerUser = async (user) => {
    return await knex("usuarios").insert({
        nombre_usuario: user.name,
        correo_usuario: user.email, 
        pass_usuario: user.encryptedPassword, 
        salt_usuario: user.salt,
        telefono_usuario: user.phone,
      }
    );
  }

  const getCredentials = async (email) => {
    let credentials = await knex.select("*").from("usuarios").where("correo_usuario",email);
    credentials = JSON.stringify(credentials);
    return JSON.parse(credentials);
  }
  
  const forgotPassword = async (user) => {
    return await knex("usuarios").where({correo_usuario: user.email}).update({
      pass_usuario: user.encryptedPassword,
      salt_usuario: user.salt,
    });
  }

  module.exports = {
    getCredentials,
    registerUser,
    forgotPassword,
  };