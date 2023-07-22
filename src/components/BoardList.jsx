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

  const menuModalStyles = {
    position: "absolute",
    top: "-4%",
    left: "0%",
    width: "100%",
  }

  return (
    <div className="board-main-container">
      <Modal isOpen={menuModal} style={menuModalStyles} backdrop={true} keyboard={true}>
        <div ref={modalRef}>
          <ModalHeader style={{ borderBottom: '1px solid' }}>
            <div>
              <Link to="/Inicio" style={{ color: 'black', textDecoration: 'none' }}>
                <img src={homeIcon} alt="" style={{ height: '40px', marginRight: '15px' }} />
                <label className="navigation-text">Inicio</label>
              </Link>
            </div>
          </ModalHeader>
          <ModalBody style={{marginBottom:"164%"}}>
            <div style={{ marginBottom: '25px' }}>
              <Link to="/Tablero" style={{ color: 'black', textDecoration: 'none' }}>
                <img src={taskIcon} alt="" style={{ height: '40px', width: '35px', marginRight: '15px' }} />
                <label className="navigation-text">Tablero</label>
              </Link>
            </div>
            <div>
              <Link to="/Formularios" style={{ color: 'black', textDecoration: 'none', marginBottom: '100vh'}}>
                <img src={formIcon} alt="" style={{ height: '40px', width: '35px', marginRight: '15px' }} />
                <label className="navigation-text">Formulario</label>
              </Link>
            </div>
          </ModalBody>
        </div>
      </Modal>
      <div className="board-main-header">
        <button className="menu-button" onClick={() => setmenuModal(true)}>
          <img src={menuImg} className="menu-image" alt="" />
        </button>
        <Link to="/Inicio">
          <img className="logo-witak-head" src={group2} alt="" />
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
        <div className="lista-boards">
          <div className="board-list-card">
            <div className="board-list-head">
            <h1>PENDIENTES</h1>
            </div>
            <div className="board-list-body">
              {boards.map((board) => {
                if (board.columna_referencia === 1) {
                  return (
                    <div className="board-card">
                      <label>{board.nombre_tablero}</label>
                      <img></img>
                    </div>
                  );
                }
              })}
              <button className="create-board-button">
                <h3>Añade otra tarjeta</h3>
                <h2>+</h2>
              </button>
            </div>
          </div>
          <div className="board-list-card">
            <div className="board-list-head">
              <h1>EN PROCESO</h1>
            </div>
            <div className="board-list-body">
              {boards.map((board) => {
                if (board.columna_referencia === 2) {
                  return (
                    <div>
                      <label>{board.nombre_tablero}</label>
                      <img></img>
                    </div>
                  );
                }
              })}
              <button className="create-board-button">
                <h3>Añade otra tarjeta</h3>
                <h2>+</h2>
              </button>
            </div>
          </div>
          <div className="board-list-card">
            <div className="board-list-head">
              <h1>TERMINADOS</h1>
            </div>
            <div className="board-list-body">
              {boards.map((board) => {
                if (board.columna_referencia === 3) {
                  return (
                    <div>
                      <label>{board.nombre_tablero}</label>
                      <img></img>
                    </div>
                  );
                }
              })}
              <button className="create-board-button">
                <h3>Añade otra tarjeta</h3>
                <h2>+</h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardList;
