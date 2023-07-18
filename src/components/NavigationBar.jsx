import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/CSS/NavigationBar.css';

function NavigationBar(props) {
  const { homeIcon, taskIcon, formIcon } = props;
  const [modal, setModal] = useState(true);
  const modalRef = useRef(null);

  const fecharModal = () => {
    setModal(false);
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

  const modalStyles = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '20%',
    height: '100vh',
  };

  return (
    <div>
      <Modal isOpen={modal} style={modalStyles} backdrop={true} keyboard={true}>
        <div ref={modalRef}> {/* Modal container */}
          <ModalHeader style={{ borderBottom: '1px solid', marginBottom: '' }}>
            <div className="navigation-inicio">
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
    </div>
  );
}

export default NavigationBar;
