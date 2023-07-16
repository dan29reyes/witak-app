import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CSS/BoardList.css";
import axios from "axios";
import Board from "./Board";

function BoardList(props) {
  const { group2, notificationImg, menuImg } = props;

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = () => {
    const options = {
        method: 'POST',
        url: 'http://localhost:8000/tablero/obtener',
        data: { id_usuario: localStorage.getItem("id_usuario")}
    };
    return axios.request(options)
        .then(function (response) {
          setBoards(response.data);
        })
        .catch(function (error) {
          throw error;
        });
  }

  return (
    <div className="board-main-container">
      <div className="board-main-header">
        <button style={{ background: "none", border: "none", padding: "0", cursor: "pointer", marginRight: "0.8%", marginLeft: "0.5%" }}>
          <img src={menuImg} style={{ height: "20px" }} alt="" />
        </button>
        <Link to="/Home">
          <img style={{ height: "40px" }} src={group2} alt="" />
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", marginRight: "3%"}}>
          <button style={{ background: "none", border: "none", padding: "0", cursor: "pointer" }}>
            <img src={notificationImg} style={{ height: "27px" }} alt="" />
          </button>
        </div>
      </div>
      <div className="board-main-body">
        <div className="informacion-header">
            <h1 className="name-user">Bienvenido {localStorage.getItem("nombre_usuario")} ☆</h1>
            <h2 className="description-tablero">Tablero de forms de trabajos en GF marketing | Ordenar</h2>
        </div>
        {boards.length > 0 ? (
          <div className="lista-boards">
            {boards.map((board) => (
              <div key={board.id_tablero}>
                <Board
                  name_board={board.nombre_tablero}
                  description_board={board.descripcion_tablero}
                  fecha_limite={board.fecha_limite.substring(0, 10).replace(/-/g, "/")}
                  estado_board={board.estado_tablero}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>No hay tableros</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardList;
