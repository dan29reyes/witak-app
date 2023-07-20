import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/CSS/BoardList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CSS/NavigationBar.css'
import axios from "axios";
import Board from "./Board";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Button } from 'reactstrap';

function BoardList(props) {
  const { group2, notificationImg, menuImg, homeIcon, taskIcon, formIcon } = props;

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
    transform: "translate(-50%,-50%)",
    width: "30%",
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "fecha_limite") {
      value = value.replace("/", "-");
      value += " 23:59:59";
    }
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
        id_usuario: parseInt(form.id_usuario ),
        fecha_limite: form.fecha_limite
      }
    };
    console.log(options.data)
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

  const [menuModal, setmenuModal] = useState(false);
  const modalRef = useRef(null);

  const fecharModal = () => {
    setmenuModal(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    });

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      fecharModal();
    }
  };

  const menuModalStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '20%',
  };

  return (
    <div className="board-main-container">
      <Modal isOpen={menuModal} style={menuModalStyle} backdrop={true} keyboard={true}>
        <div ref={modalRef}>
          <ModalHeader style={{ borderBottom: '1px solid' }}>
            <div>
              <Link to="/Inicio" style={{ color: 'black', textDecoration: 'none' }}>
                <img src={homeIcon} alt="" style={{ height: '40px', marginRight: '15px' }} />
                <label className="navigation-text">Inicio</label>
              </Link>
            </div>
          </ModalHeader>
          <ModalBody>
            <div style={{ marginBottom: '25px' }}>
              <Link to="/Tablero" style={{ color: 'black', textDecoration: 'none' }}>
                <img src={taskIcon} alt="" style={{ height: '40px', width: '35px', marginRight: '15px' }} />
                <label className="navigation-text">Tablero</label>
              </Link>
            </div>
            <div>
              <Link to="/Formularios" style={{ color: 'black', textDecoration: 'none' }}>
                <img src={formIcon} alt="" style={{ height: '40px', width: '35px', marginRight: '15px' }} />
                <label className="navigation-text">Formulario</label>
              </Link>
            </div>
          </ModalBody>
        </div>
      </Modal>
      <div className="board-main-header">
        <button 
          style={{ background: "none", border: "none", padding: "0", cursor: "pointer", marginRight: "0.8%", marginLeft: "0.5%" }}
          onClick={() => setmenuModal(true)}>
          <img src={menuImg} style={{ height: "20px" }} alt="" />
        </button>
        <Link to="/Inicio">
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
          <h2 className="description-tablero">Tablero de forms de trabajos en GF marketing</h2>
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
        <ModalHeader style={{backgroundColor: "#006fff", color:"white"}}>
          Nuevo Tablero
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label className="modal-label">Nombre</Label>
            <Input
              type="text"
              id="nombre_tablero"
              name="nombre_tablero"
              className="modal-input"
              placeholder="Escribe un nombre..."
              onChange={handleChange}
            />
            <Label className="modal-label">Descripcion</Label>
            <Input
              type="textarea"
              id="descripcion_tablero"
              name="descripcion_tablero"
              className="modal-input"
              style={{height: "150px", resize: "none"}}
              placeholder="Escribe una descripcion..."
              onChange={handleChange}
            />
            <Label className="modal-label">Fecha Limite</Label>
            <Input
              type="date"
              id="fecha_limite"
              name="fecha_limite"
              className="modal-input"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={agregarTablero}>
            Agregar
          </Button>
          <Button color="danger" onClick={abrirModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BoardList;
