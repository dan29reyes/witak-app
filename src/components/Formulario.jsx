import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CSS/NavigationBar.css'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../styles/CSS/Formulario.css'

function Formulario(props){
    const {menuImg, homeIcon, taskIcon, formIcon} = props;

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
                    <img src={menuImg} style={{ height: "20px" }} alt="" />
                </button>
                <label className="form-header-title">Creative Board</label>
            </div>
            <div className="Formulario-body">
            </div>
            <div className="Formulario-footer">
            </div>
        </div>
    )
}

export default Formulario;