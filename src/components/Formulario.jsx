import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CSS/NavigationBar.css'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../styles/CSS/Formulario.css'

function Formulario(props){
    const {menuImg, homeIcon, taskIcon, formIcon} = props;

    //Conseguir diseñadores
    const [designers, setDesigners] = useState([]);
    
    //Boton de menu
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
    //Fin boton de menu
    return(
        <div className="formulario-container">
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
                            <Link to="/Formulario" style={{ color: 'black', textDecoration: 'none' }}>
                                <img src={formIcon} alt="" style={{ height: '40px', width: '35px', marginRight: '15px' }} />
                                <label className="navigation-text">Formulario</label>
                            </Link>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
            <div className="Formulario-header">
                <button 
                    style={{ background: "none", border: "none", cursor: "pointer", marginRight: "0.8%", marginLeft: "0.5%" }}
                    onClick={() => setmenuModal(true)}>
                    <img src={menuImg} style={{ height: "25px", marginTop:"-55%" }} alt="" />
                </button>
                <label className="form-header-title">Creative Board</label>
            </div>
            <div className="Formulario-body">
                <div className="Formulario-body-row">
                    <label>Objetivo</label>
                    <input type="text" className="formulario-input" placeholder="Objetivo" />
                    <label>Diseñador Grafico</label>
                    <select>
                        <option value="value1">Value 1</option>
                        <option value="value2" selected>Value 2</option>
                    </select>
                </div>
                <div className="Formulario-body-row">
                    <label>Descripciòn</label>
                    <textarea type="text" className="formulario-input" placeholder="Descripciòn" />
                </div>
                <div className="Formulario-body-row">
                    <div className="Formulario-body-column">
                        <label>Tono</label>
                        <div>
                            <button>Elegante</button>
                            <button>Jugueton</button>
                            <button>Ejecutivo</button>
                            <button>Llamativo</button>
                            <button>Persuasivo</button>
                        </div>
                    </div>
                    <div className="Formulario-body-column">
                        <label>Publico</label>
                        <input type="text" className="formulario-input" placeholder="Publico" />
                    </div>
                    <div className="Formulario-body-column">
                        <label>Tamaño</label>
                        <input type="text" className="formulario-input" placeholder="Tamaño" />
                    </div>
                    <div className="Formulario-body-column">
                        <label>Fecha Limite</label>
                        <input type="date" className="formulario-date" placeholder="Fecha Limite" />
                    </div>
                </div>
            </div>
            <div className="Formulario-footer">
                <button className="formulario-button">Enviar Formulario</button>
            </div>
        </div>
    )
}

export default Formulario;