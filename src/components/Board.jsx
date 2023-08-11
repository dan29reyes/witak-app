import {React, useEffect, useState} from "react";
import "../styles/CSS/Board.css";
import axios from "axios"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function Board({abrirTablero, idTablero, idColumna}){
    const [tablero, setTablero] = useState({
        id_tablero: "",
        nombre_tablero: "",
        descripcion_tablero: "",
        columna_referencia: 0,
        fecha_creacion: "",
        fecha_limite: "",
    });

    const getTablero = () => {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/tablero/obtener',
            data: { id_usuario: localStorage.getItem("id_usuario")}
        };
        return axios.request(options)
            .then(function (response) {
                console.log(response.data.length)
                for (let i = 0; i < response.data.length; i++){
                    if (response.data[i].id_tablero === idTablero){
                        console.log(response.data[i])
                        setTablero(response.data[i]);
                        return;
                    }else{
                        console.log("Tablero no existe")
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
        <Modal isOpen={abrirTablero} style={{color: "#006fff", backdropFilter: "blur(8px)", position: "absolute", top: "50%", left: "50%", transform: "translate(-53%,-50%)", width: "80%" }} backdrop={true} keyboard={true}>
            <ModalHeader>
                <div className="header-modal-tablero">
                    <div>
                        <h3>{tablero.nombre_tablero}</h3>
                        {idColumna === 1 ? <h5>En la Lista Pendientes</h5> :
                        idColumna === 2 ? <h5>En la Lista Proceso</h5> :
                        idColumna === 3 ? <h5>En la Lista Terminado</h5> : 
                        null
                        }
                    </div>
                    <button>
                        <img src="" alt=""/>
                    </button>
                </div>
            </ModalHeader>
            <ModalBody>
            </ModalBody>
        </Modal>
    );
}

export default Board;