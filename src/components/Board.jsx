import {React, useState} from "react";
import "../styles/CSS/Board.css";
import {useNavigate} from "react-router-dom";
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';

function Board({abrirTablero, idTablero, idColumna, exitIcon, descripIcon, fechaIcon, trashIcon}){
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

    const [tableroGet, setTableroGet] = useState(false);

    const getTablero = () => {
        if(tableroGet === false){
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
                            setTableroGet(true);
                            return;
                        }
                    }
                })
                .catch(function (error) {
                    throw error;
                });
        }else{
            return;
        }
    }

    const CustomToast = ({ message, onConfirm, onDecline }) => {
        return (
          <div style={{display:"flex", flexDirection:"row"}}> 
            <div>{message}</div>
            <div>
                <button style={{backgroundColor:"rgb(0,179,80", color:"white", borderRadius:"15px",border:"none", marginBottom:"5px"}} onClick={onConfirm}>Confirmar</button>
                <button style={{backgroundColor:"rgb(243,61,83)", color:"white", borderRadius:"15px",border:"none"}} onClick={onDecline}>Deshacer</button>
            </div>
          </div>
        );
      };

    function onFormDelete() {
        toast.warn(
            <CustomToast 
                message={"Seguro que quieres eliminar este tablero?"} 
                onConfirm={eliminarTablero} 
                onDecline={toast.dismiss()} 
            />,
            { 
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            }
        );
    }

    async function eliminarTablero() {
        const options = {
            method: 'POST',
            url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/tablero/borrar',
            data: { id_tablero: tablero.id_tablero, id_usuario: parseInt(localStorage.getItem("id_usuario"))}
        };
        return axios.request(options)
            .then(function (response) {
                console.log(response.data);
                window.location.reload();
            })
            .catch(function (error) {
                throw error;
            });
    }

    const verFormulario = () => {
        localStorage.setItem("id_formulario", tablero.id_formulario);
        navigate("/Formularios");
    }

    const [editTablero, setEditTablero] = useState({
        descripcion_tablero: "",
        fecha_limite: "",
    });

    const editarTablero = () => {
        let fechaTablero = "";
        let descripcion = "";

        if (editTablero.fecha_limite === ""){
            fechaTablero = tablero.fecha_limite;
        }else{
            fechaTablero = editTablero.fecha_limite;
        }
        fechaTablero.replace("-", "/");
        fechaTablero += " 23:59:59";

        if (editTablero.descripcion_tablero === ""){
            descripcion = tablero.descripcion_tablero;
        }else{
            descripcion = editTablero.descripcion_tablero;
        }

        const options = {
            method: 'POST',
            url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/tablero/actualizar',
            data: { 
                id_tablero: tablero.id_tablero, 
                nombre_tablero: tablero.nombre_tablero,
                descripcion_tablero: descripcion, 
                fecha_limite: fechaTablero,
                columna_referencia: tablero.columna_referencia,
                id_usuario: parseInt(localStorage.getItem("id_usuario")),
            }
        };
        return axios.request(options)
            .then(function (response) {
                setEditTablero({
                    descripcion_tablero: "",
                    fecha_limite: "",
                });
                setTablero({
                    ...tablero,
                    descripcion_tablero: descripcion,
                    fecha_limite: fechaTablero,
                });
            })
            .catch(function (error) {
                throw error;
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
                {editTablero.descripcion_tablero === "" ?
                    <p className="paragraph-board" 
                        onClick={()=>{setEditTablero({
                            ...editTablero,
                            descripcion_tablero: tablero.descripcion_tablero,
                        })}}
                        style={{marginBottom:"20px"}}>
                        {tablero.descripcion_tablero}
                    </p>
                :
                    <textarea 
                        className="paragraph-board" 
                        value={editTablero.descripcion_tablero} 
                        onChange={(e)=>{setEditTablero({
                            ...editTablero,
                            descripcion_tablero: e.target.value,
                        })}}
                        style={{border:"none", resize:"none"}}
                    />
                }
                <div className="board-row-container">
                    <img src={fechaIcon} alt="" className="modal-icon-i"/>
                    <h5 className="label-board">Fecha Limite</h5>
                </div>
                {editTablero.fecha_limite === "" ?
                    <p className="paragraph-board"
                        onClick={()=>{setEditTablero({
                            ...editTablero,
                            fecha_limite: tablero.fecha_limite,
                        })}}>
                        {tablero.fecha_limite}
                    </p>
                :
                    <input 
                        type="date" 
                        className="paragraph-board" 
                        value={editTablero.fecha_limite} 
                        onChange={(e)=>{setEditTablero({
                            ...editTablero,
                            fecha_limite: e.target.value,
                        })}}
                        style={{border:"none"}}
                    />
                }
            </div>
            <div className="modal-design-footer">
                { tablero.id_formulario === null ? 
                    <button disabled style={{backgroundColor:"#2f7ee5e0"}} className="ver-formulario">No hay Formulario</button>
                :
                <button onClick={()=>{verFormulario()}} className="ver-formulario">Ver Formulario</button>
                }
                {editTablero.descripcion_tablero === "" && editTablero.fecha_limite === "" ?
                    <button 
                        style={{display:"none"}} 
                        className="ver-formulario">
                        Editar Tablero
                    </button>
                :
                    <button 
                        onClick={()=>{editarTablero()}} 
                        style={{marginLeft:"15px"}}
                        className="ver-formulario">
                        Editar Tablero
                    </button>
                }
                <button className="trash-button">
                    <img src={trashIcon} alt="" onClick={onFormDelete} className="trash-icon"/>
                </button>
            </div>
        </div>
    );
}

export default Board;