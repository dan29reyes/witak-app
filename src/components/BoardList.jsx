import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/CSS/BoardList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CSS/NavigationBar.css'
import "../styles/CSS/Board.css";
import axios from "axios";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import Board from "./Board";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Button } from 'reactstrap';
import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Notificaciones from "./Notificaciones";
import Board from "./Board"

function BoardList(props) {
  const { group2, notificationImg, menuImg, closeIcon, homeIcon, logIcon,
    pencilIcon, exitIcon, descripIcon, fechaIcon} = props;

  //Logica mostrar tablero
  const [propsTablero, setpropsTablero] = useState({ 
    abrirTablero: 'none',
    idTablero: 0,
    idColumna: 0
  });

  const handleAbrir = (id_referencia, columna) => {
    let abrir = '';
    if (propsTablero.abrirTablero === 'none'){
      abrir = 'fixed';
    }else{
      abrir = 'none';
    }
    setpropsTablero({
      abrirTablero: abrir,
      idTablero: id_referencia,
      idColumna: columna,
      exitIcon: exitIcon,
      descripIcon: descripIcon,
      fechaIcon: fechaIcon
    })
  }
  //Modal y logica de agregar tablero
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  async function getBoards (){
      const options = {
          method: 'POST',
          url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/tablero/obtener',
          data: { id_usuario: localStorage.getItem("id_usuario")}
      };
      return await axios.request(options)
          .then(function (response) {
            setBoards(response.data);
          })
          .catch(function (error) {
            throw error;
          });
    }

  const [form, setForm] = useState({
    nombre_tablero: "",
    descripcion_tablero: "",
    fecha_limite: "",
    id_usuario: localStorage.getItem("id_usuario"),

  });

  const agregarTablero = () => {
    const options = {
      method: 'POST',
      url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/tablero/crear',
      data: {
        nombre_tablero: form.nombre_tablero,
        descripcion_tablero: form.descripcion_tablero,
        id_usuario: parseInt(form.id_usuario ),
        fecha_limite: form.fecha_limite,
        columna_referencia: parseInt(form.columna_referencia)
      }
    };
    axios.request(options)
      .then(function (response) {
        getBoards();
        abrirModal();
      })
      .catch(function (error) {
        console.error(error);
      });
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

  const [modalAgregar, setModal] = useState(false);

  const abrirModal = (columna) => {
    setModal(!modalAgregar);
    setForm({
      ...form,
      columna_referencia: columna
    });
  }

  //Menu Desplegable
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
  
  const calculateModalHeight = () => {
    const screenHeight = window.innerHeight;
    const modalHeight = screenHeight * 0.89; // You can adjust the percentage (0.8) as needed
    return modalHeight;
  };

  const logOut = () => {
    localStorage.clear();
  }

  const [modalHeight, setModalHeight] = useState(calculateModalHeight());

  useEffect(() => {
    const handleResize = () => {
      setModalHeight(calculateModalHeight());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Drag and Drop
  const onDragEnd = (result) => {
    if (!result.destination) return;
      const { source, destination } = result;
      if (source.droppableId !== destination.droppableId){
        const sourceColumn = source.droppableId;
        const destColumn = destination.droppableId;
        const sourceIndex = source.index;
        boards[sourceIndex].columna_referencia = parseInt(destColumn);
        try{
          const options = {
            method: 'POST',
            url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/tablero/actualizar',
            data: {
              id_tablero: boards[sourceIndex].id_tablero,
              nombre_tablero: boards[sourceIndex].nombre_tablero,
              descripcion_tablero: boards[sourceIndex].descripcion_tablero,
              id_usuario: boards[sourceIndex].id_usuario,
              fecha_limite: boards[sourceIndex].fecha_limite,
              columna_referencia: parseInt(destination.droppableId)
            }
          };
          axios.request(options)
            .then(function (response) {
              // console.log(response.data);
            })
            .catch(function (error) {
              // console.error(error);
            });
          }catch(error){
            // console.log(error);
          }
        }
  }
  
  //Modal de notificaciones
  const [caja, setCaja] = useState(false);

  //Generar enlace
  const notify = () => 
    toast.success(
      "Enlace copiado al portapapeles",
      { position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      }
    );

  function copiarEnlaceAlPortapapeles(){
    const enlace = 'https://www.witakhn.com/Formularios?id_usuario=' + localStorage.getItem("id_usuario");
    const temporalInput = document.createElement('input');
    document.body.appendChild(temporalInput);
    temporalInput.value = enlace;
    temporalInput.select();
    document.execCommand('copy');
    document.body.removeChild(temporalInput);
    notify();
  }

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result,[1,2, 3])}>
      <div className="board-main-container animate-enter">
        <Modal isOpen={menuModal} backdrop={true} keyboard={true} style={{marginTop:"auto", position:"fixed",marginLeft:"auto"}}>
          <div ref={modalRef}>
            <ModalHeader style={{ borderBottom: '1px solid'}}>
              <div>
                <Link to="/Inicio" style={{ color: 'black', textDecoration: 'none' }}>
                  <img src={homeIcon} alt="" style={{ height: '40px', marginRight: '15px' }} />
                  <label className="navigation-text">Inicio</label>
                </Link>
              </div>
            </ModalHeader>
            <ModalBody style={{ height: `${modalHeight}px`, overflowY: "auto" }}>
            <div style={{ marginBottom: '25px' }}>
                <Link to="/Registrar" style={{ color: 'black', textDecoration: 'none' }}>
                  <label className="navigation-text">Registrar</label>
                </Link>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <Link to="/QuienesSomos" style={{ color: 'black', textDecoration: 'none' }}>
                  <label className="navigation-text">Quiénes Somos</label>
                </Link>
              </div>
              <div style={{marginTop:"62vh"}}>
                <Link to="/Inicio" onClick={()=>{logOut()}} style={{ color: 'black', textDecoration: 'none' }}>
                  <img src={logIcon} alt="" style={{ height: '40px', width: '35px', marginRight: '15px' }} />
                  <label className="navigation-text">Cerrar Sesión</label>
                </Link>
              </div>
            </ModalBody>
          </div>
        </Modal>
        <Modal isOpen={modalAgregar} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "90%",}} backdrop={true} keyboard={true}>
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
        {propsTablero.abrirTablero === 'fixed' && <Board {...propsTablero}/>}
        <div className="board-main-header">
          <button className="menu-button" onClick={() => setmenuModal(true)}>
            <img src={menuImg} className="menu-image" alt="" />
          </button>
          <Link to="/Inicio">
            <img className="logo-witak-head" src={group2} alt="" />
          </Link>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", marginRight: "3%"}}>
            <button style={{ background: "none", border: "none", padding: "0", cursor: "pointer" }}>
              {caja === false ? (<img src={notificationImg} style={{ height: "27px" }} alt="" onClick={()=>setCaja(!caja)}/>
              ) : (
                <img src={closeIcon} style={{ height: "27px" }} alt="" onClick={()=>setCaja(!caja)}/>
              )}
            </button>
          </div>
        </div>
        <div className="board-main-body">
          {caja && <Notificaciones {...props}/>}
          <div className="informacion-header">
            <h1 className="name-user">Bienvenido {localStorage.getItem("nombre_usuario")} ☆</h1>
            <h2 className="description-tablero">Tablero de forms de trabajos</h2>
          </div>
        <div className="lista-boards">
          <div className="board-list-card">
            <div className="board-list-head" style={{backgroundColor:"#F33D53"}}>
              <h1>PENDIENTES</h1>
            </div>
            <Droppable droppableId="1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="board-list-body">
                  {boards.map((board, index) => {
                    if (board.columna_referencia === 1) {
                      return (
                        <Draggable key={board.id_tablero} draggableId={board.id_tablero.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="board-card" onClick={()=>handleAbrir(board.id_tablero, 1)} style={{backgroundColor:"rgb(245, 111, 127)"}}>
                                <label>{board.nombre_tablero}</label>
                                <img src={pencilIcon} alt="" className="pencil-icon"/>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                  <button className="create-board-button" onClick={() => abrirModal(1)}>
                    <h3 style={{color:"#F33D53"}}>Añade otra tarjeta</h3>
                    <h2 style={{color:"#F33D53"}}>+</h2>
                  </button>
                </div>
              )}
            </Droppable>
          </div>
          <div className="board-list-card">
            <div className="board-list-head">
              <h1>EN PROGRESO</h1>
            </div>
            <Droppable droppableId="2">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="board-list-body">
                  {boards.map((board, index) => {
                    if (board.columna_referencia === 2) {
                      return (
                        <Draggable key={board.id_tablero} draggableId={board.id_tablero.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="board-card" onClick={()=>handleAbrir(board.id_tablero, 2)} >
                                <label>{board.nombre_tablero}</label>
                                <img src={pencilIcon} alt="" className="pencil-icon"/>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                  <button className="create-board-button" onClick={() => abrirModal(2)}>
                    <h3>Añade otra tarjeta</h3>
                    <h2>+</h2>
                  </button>
                </div>
              )}
            </Droppable>
          </div>
          <div className="board-list-card" >
            <div className="board-list-head" style={{backgroundColor:"#00b350"}}>
              <h1>TERMINADO</h1>
            </div>
            <Droppable droppableId="3">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="board-list-body">
                  {boards.map((board, index) => {
                    if (board.columna_referencia === 3) {
                      return (
                        <Draggable key={board.id_tablero} draggableId={board.id_tablero.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="board-card" onClick={()=>handleAbrir(board.id_tablero, 3)} style={{backgroundColor:"#75c99a"}}>
                                <label>{board.nombre_tablero}</label>
                                <img src={pencilIcon} alt="" className="pencil-icon"/>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                  <button className="create-board-button" onClick={() => abrirModal(3)}>
                    <h3 style={{color: "#00b350"}}>Añade otra tarjeta</h3>
                    <h2 style={{color: "#00b350"}}>+</h2>
                  </button>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
      <button className="generar-link" onClick={()=>{copiarEnlaceAlPortapapeles()}}>+</button>
      <ToastContainer 
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  </DragDropContext>)
}

export default BoardList;