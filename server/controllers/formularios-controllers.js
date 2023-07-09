const formularioServices = require("../services/formularios-services");

async function obtenerFormularios(req, res) {
    const { id_usuario } = req.body;
    try {
        if (typeof id_usuario === "number") {
            const formularios = await formularioServices.obtenerFormularios(id_usuario);
            res.send(formularios);
        } else {
            res.status(400).send("Error obteniendo los formularios")
        }
    } catch (error) {
        console.log("Error obteniendo los formularios", error);
    }
}

async function obtenerFormulario(req, res) {
    const { id_formulario } = req.body;
    try {
        if (typeof id_formulario === "number") {
            const formulario = await formularioServices.obtenerFormulario(id_formulario);
            res.send(formulario);
        } else {
            res.status(400).send("Error obteniendo el formulario")
        }
    } catch (error) {
        console.log("Error obteniendo el formulario", error);
    }
}

async function crearFormulario(req, res) {
    const { idea_formulario, nombre_formulario, objetivo_formulario, descripcion_formulario,
        publico_formulario, tono_formulario, fecha_limite, id_usuario } = req.body;
    try {
        if (typeof nombre_formulario === "string" && typeof id_usuario === "number" &&
        typeof idea_formulario === "string" && typeof objetivo_formulario === "string" &&
        typeof descripcion_formulario === "string" && typeof publico_formulario === "string" &&
        typeof tono_formulario === "string" && typeof fecha_limite === "string") {
            await formularioServices.crearFormulario(req.body);
            res.status(200).send({
                message: "Formulario creado exitosamente",
            });
        } else {
            res.status(400).send("Error creando el formulario")
        }
    } catch (error) {
        console.log("Error creando el formulario", error);
    }
}

async function borrarFormulario(req, res) {
    const { id_formulario, id_usuario } = req.body;
    try {
        if (typeof id_formulario === "number" && typeof id_usuario === "number") {
            await formularioServices.borrarFormulario(id_formulario);
            const formularios = await formularioServices.obtenerFormularios(id_usuario);
            res.status(200).send(formularios);
        } else {
            res.status(400).send("Error borrando el formulario")
        }
    } catch (error) {
        console.log("Error borrando el formulario", error);
    }
}

async function actualizarFormulario(req, res) {
    const { idea_formulario, nombre_formulario, objetivo_formulario, descripcion_formulario,
        publico_formulario, tono_formulario, fecha_limite, id_formulario, id_usuario } = req.body;
    try {
        if (typeof nombre_formulario === "string" && typeof id_usuario === "number" &&
        typeof idea_formulario === "string" && typeof objetivo_formulario === "string" &&
        typeof descripcion_formulario === "string" && typeof publico_formulario === "string" &&
        typeof tono_formulario === "string" && typeof fecha_limite === "string" && typeof id_formulario === "number") {
            await formularioServices.actualizarFormulario(req.body);
            const formularios = await formularioServices.obtenerFormularios(id_usuario);
            res.status(200).send(formularios);
        } else {
            res.status(400).send("Error actualizando el formulario")
        }
    } catch (error) {
        console.log("Error actualizando el formulario", error);
    }
}

async function mandarCorreo(req, res) {
    const { from, to, subject, text, html, attachments } = req.body;
    try {
        if (typeof from === "string" && typeof to === "string" 
        && typeof subject === "string" && typeof text === "string") {
            await formularioServices.mandarCorreo(from, to, subject, text, html, attachments);
            res.status(200).send("Correo enviado");
        } else {
            res.status(400).send("Error mandando el correo")
        }
    } catch (error) {
        console.log("Error mandando el correo", error);
    }
}

module.exports = {
    obtenerFormularios,
    obtenerFormulario,
    crearFormulario,
    borrarFormulario,
    actualizarFormulario,
    mandarCorreo
}