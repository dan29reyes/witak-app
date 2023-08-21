import {React, useEffect, useState} from "react";
import "../styles/CSS/Board.css";
import axios from "axios"

function Board({abrirTablero, idTablero, idColumna, exitIcon, descripIcon, fechaIcon}){
    const [tablero, setTablero] = useState({
        id_tablero: "",
        nombre_tablero: "",
        descripcion_tablero: "",
        columna_referencia: 0,
        fecha_creacion: "",
        fecha_limite: "",
        abrir_tablero: abrirTablero,
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
            url: 'http://localhost:8000/tablero/obtener',
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
                        });
                        return;
                    }
                }
            })
            .catch(function (error) {
                throw error;
            });
    }

    useEffect(() => {  
        getTablero();
    }, []);

    return(
        <div className='modal-design' style={{display: tablero.abrir_tablero}}>
            <div className="modal-design-header">
                <div>
                    <h3 className="nombre-board">{tablero.nombre_tablero}</h3>
                    {idColumna === 1 ? <h5 className="columna-board">En la Lista Pendientes</h5> :
                    idColumna === 2 ? <h5 className="columna-board">En la Lista Proceso</h5> :
                    idColumna === 3 ? <h5 className="columna-board">En la Lista Terminado</h5> : 
                    null
                    }
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
                <button>
                    Ver Formulario
                </button>
                <button>
                    Marcar como Terminado
                </button>
            </div>
        </div>
    );
}

export default Board;