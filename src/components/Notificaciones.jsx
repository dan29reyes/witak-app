import { React, useEffect, useState } from 'react';
import '../styles/CSS/Notificaciones.css';
import axios from 'axios';

function Notificaciones(props){
    const {trianguloIcon} = props;
    const [notificaciones, setNotificaciones] = useState([]);

    const getNotificaciones = () => {
        const options = {
        method: 'POST',
        url: 'http://localhost:8000/formularios/obtenerVarios',
        data: { id_usuario: parseInt(localStorage.getItem("id_usuario"))}
        };
        return axios.request(options)
            .then(function (response) {
            setNotificaciones(response.data);
            })
            .catch(function (error) {
            throw error;
            });
    }

    useEffect(() => {
        getNotificaciones();
    }, []);

    const agregarTablero = (id, nombre, descripcion, fecha) => {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/tablero/crear',
            data: {
                nombre_tablero: nombre,
                descripcion_tablero: descripcion,
                id_usuario: parseInt(localStorage.getItem("id_usuario")),
                fecha_limite: fecha.substring(0, 10)+" 23:59:59"
            }
        };

        axios.request(options).then(function (response) {
        }).catch(function (error) {
            console.error(error);
        });

        const options2 = {
            method: 'POST',
            url: 'http://localhost:8000/formularios/actualizar',
            data: {
                id_formulario: id,
                estado_formulario: "ACEPTADO",
                id_usuario: parseInt(localStorage.getItem("id_usuario"))
            }
        };
        return axios.request(options2).then(function (response) {
            getNotificaciones();
        }
        ).catch(function (error) {
            throw error;
        })
    }

    const rechazarTablero = (id) => {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/formularios/actualizar',
            data: {
                id_formulario: id,
                estado_formulario: "RECHAZADO",
                id_usuario: parseInt(localStorage.getItem("id_usuario"))
            }
        };
        return axios.request(options).then(function (response) {
            getNotificaciones();
        }
        ).catch(function (error) {
            throw error;
        })
    }

    const hasPendingNotifications = notificaciones.some(
        (notificacion) => notificacion.estado_formulario === "PENDIENTE"
    );

    return(
        <div style={{right:"0", position:"absolute"}}>
            <img src={trianguloIcon} alt="" style={{height:"20px", marginRight:"40px"}}/>
            <div className="caja-notificaciones">
                <div className="centro-notificaciones">
                    <h1 className='titulo-centro'>Centro de Notificaciones</h1>
                </div>
                {notificaciones.length > 0 && hasPendingNotifications? (
                    notificaciones.map((notificacion) => {
                        if(notificacion.estado_formulario === "PENDIENTE"){
                        return(
                        <div className="carta-notificacion">
                            <h3 className='carta-h1'>{notificacion.nombre_formulario} acaba de enviar un proyecto</h3>
                            <div className="carta-botones">
                                <button 
                                    className='boton-aceptar'
                                    onClick={() => agregarTablero(
                                        notificacion.id_formulario,
                                        notificacion.nombre_formulario, 
                                        notificacion.descripcion_formulario, 
                                        notificacion.fecha_limite
                                    )}
                                    >ACEPTAR
                                </button>
                                <button 
                                    className='boton-rechazar'
                                    onClick={() => rechazarTablero(notificacion.id_formulario)}
                                    >RECHAZAR
                                </button>
                            </div>
                        </div>
                        )}
                    })
                ) : (
                    <h3 className="no-hay-notificaciones">No hay notificaciones</h3>
                )}
            </div>
        </div>
    )
}

export default Notificaciones;