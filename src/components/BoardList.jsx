import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CSS/BoardList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Board from "./Board";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Button } from 'reactstrap';

function BoardList(props) {
  const { group2, notificationImg, menuImg } = props;

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  const [modal, setModal] = useState(false);

  const abrirModal = () => {
    setModal(!modal);
  }

  const modalStyles = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const [form, setForm] = useState({
    nombre_tablero: "",
    descripcion_tablero: "",
    fecha_limite: "",
    id_usuario: localStorage.getItem("id_usuario")
  });

  const agregarTablero = () => {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/tablero/crear',
      data: {
        nombre_tablero: form.nombre_tablero,
        descripcion_tablero: form.descripcion_tablero,
        id_usuario: form.id_usuario,
        fecha_limite: form.fecha_limite
      }
    };
    axios.request(options)
      .then(function (response) {
        console.log(response.data);
        getBoards();
        abrirModal();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

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
      <footer className="board-main-footer">
        <button 
          className="create-board-button"
          onClick={abrirModal}
          >AGREGAR  +
        </button>
      </footer>
      <Modal isOpen={modal} style={modalStyles}>
        <ModalHeader>Nuevo Tablero</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Nombre Tablero</Label>
            <Input
              type="text"
              id="nombre_tablero"
              name="nombre_tablero"
              onChange={handleChange}
            />
            <Label>Descripcion</Label>
            <Input
              type="text"
              id="descripcion_tablero"
              name="descripcion_tablero"
              onChange={handleChange}
            />
            <Label>Fecha Limite</Label>
            <Input
              type="date"
              id="fecha_limite"
              name="fecha_limite"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={agregarTablero}>
            Agregar
          </Button>
          <Button color="secondary" onClick={abrirModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BoardList;
