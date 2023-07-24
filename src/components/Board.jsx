import {React, useEffect, useState} from "react";
import "../styles/CSS/Board.css";

function Board({name_board, description_board, fecha_limite, estado_board}){
    const [tablero, setTablero] = useState([]);

    const getTablero = () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/tablero/obtener',
            data: { id_usuario: localStorage.getItem("id_usuario")}
        };
        return axios.request(options)
            .then(function (response) {
                setTablero(response.data);
            })
            .catch(function (error) {
                throw error;
            });
    }

    useEffect(() => {
        getTablero();
    }, []);

    return(
        <div className="board-container">
            <div className="board_header">
                <h3 className="board_title">{name_board}</h3>
            </div>
            <div className="board_body">
                <p className="board_body_1">Descripcion:</p>
                <p className="board_body_2">{description_board}</p>
                <div style={{display: "flex",flexDirection: "row"}}>
                    <p className="board_body_1" >Fecha limite:</p>
                    <p className="board_body_2" style={{marginLeft:"3%"}}>{fecha_limite}</p>
                </div>
                {estado === 'PENDIENTE' ? 
                    <button className="board-estado-pendiente" onClick={handleEstado}></button>:
                    <button className="board-estado-enviado" style={{backgroundColor: "green"}} onClick={handleEstado}></button>
                }
            </div>
        </div>
    );
}

export default Board;