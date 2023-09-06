import {React, useState} from "react";
import "../styles/CSS/Board.css";
import {useNavigate} from "react-router-dom";
import axios from "axios"

function Board({abrirTablero, idTablero, idColumna, exitIcon, descripIcon, fechaIcon}){
    const navigate = useNavigate();
    
    const [tablero, setTablero] = useState({
        id_tablero: "",
        nombre_tablero: "",
        descripcion_tablero: "",
        columna_referencia: 0,
        fecha_creacion: "",
        fecha_limite: "",
        abrir_tablero: abrirTablero,
        id_formulario: null,
    });

    const handleAbrirTablero = () => {
        if (tablero.abrir_tablero === "none"){
            setTablero({
                ...tablero,
                abrir_tablero: "block",
            });
        }else{
            setTablero({
                ...tablero,
                abrir_tablero: "none",
            });
        }
    }

    const getTablero = () => {
        const options = {
            method: 'POST',
            url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/tablero/obtener',
            data: { id_usuario: localStorage.getItem("id_usuario")}
        };
        return axios.request(options)
            .then(function (response) {
                for (let i = 0; i < response.data.length; i++){
                    if (response.data[i].id_tablero === idTablero){
                        setTablero({
                            id_tablero: response.data[i].id_tablero,
                            nombre_tablero: response.data[i].nombre_tablero,
                            descripcion_tablero: response.data[i].descripcion_tablero,
                            columna_referencia: response.data[i].columna_referencia,
                            fecha_creacion: response.data[i].fecha_creacion,
                            fecha_limite: response.data[i].fecha_limite
                            .replace("T", " ").replace(".000Z", "").replace("-", "/").replace("-", "/"),
                            abrir_tablero: tablero.abrir_tablero,
                            id_formulario: response.data[i].id_formulario,
                        });
                        return;
                    }
                }
            })
            .catch(function (error) {
                throw error;
            });
    }

    const verFormulario = () => {
        localStorage.setItem("id_formulario", tablero.id_formulario);
        navigate("/Formularios");
    }

    const marcarTerminado = () => {
        const options = {
            method: 'POST',
            url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/tablero/actualizar',
            data: {
                id_tablero: parseInt(tablero.id_tablero),
                nombre_tablero: tablero.nombre_tablero,
                descripcion_tablero: tablero.descripcion_tablero,
                columna_referencia: 3,
                fecha_limite: tablero.fecha_limite,
                id_usuario: parseInt(localStorage.getItem("id_usuario"))
            }
        }
        axios.request(options).then(function (response) {
            console.log(response.data);
            setTablero({
                ...tablero,
                columna_referencia: 3,
                abrir_tablero: "none",
            });
        }
        ).catch(function (error) {
            console.error(error);
        });
    }

    getTablero();
    
    return(
        <div className='modal-design animate-enter' style={{display: tablero.abrir_tablero}}>
            <div className="modal-design-header">
                <div>
                    <h3 className="nombre-board">{tablero.nombre_tablero}</h3>
                    {idColumna === 1 ? <h5 className="columna-board">En la Lista Pendientes</h5> :
                    idColumna === 2 ? <h5 className="columna-board">En la Lista Proceso</h5> :
                    idColumna === 3 ? <h5 className="columna-board">En la Lista Terminado</h5> : 
                    null}
                </div>
                <button className="modal-exit-button" onClick={()=>{handleAbrirTablero()}}>
                    <img src={exitIcon} alt="" className="modal-exit-icon"/>
                </button>
            </div>
            <div>
                <div className="board-row-container">
                    <img src={descripIcon} alt="" className="modal-icon-i"/>
                    <h5 className="label-board">Descripcion</h5>
                </div>
                <p className="paragraph-board" 
                    style={{marginBottom:"20px"}}>
                    {tablero.descripcion_tablero}
                </p>
                <div className="board-row-container">
                    <img src={fechaIcon} alt="" className="modal-icon-i"/>
                    <h5 className="label-board">Fecha Limite</h5>
                </div>
                <p className="paragraph-board">{tablero.fecha_limite}</p>
            </div>
            <div className="modal-design-footer">
                { idColumna === 3 ? null :
                <button 
                    className="marcar-terminado"
                    onClick={()=>{marcarTerminado()}}
                >Marcar como Terminado
                </button>
                }
                <button 
                    onClick={()=>{verFormulario()}}
                    className="ver-formulario"
                    >Ver Formulario
                </button>
            </div>
        </div>
    );
}

export default Board;