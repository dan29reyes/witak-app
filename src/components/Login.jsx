import {React, useState} from "react";
import "../styles/CSS/InicioDeSesion.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function InicioDeSesion(props) {
  const navigate = useNavigate();

  const {
    group2,
    correoElectronico,
    inputType1,
    inputPlaceholder1,
    contrasea,
    inputType2,
    inputPlaceholder2,
  } = props;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
        method: "POST",
        url: "http://localhost:8000/usuarios/login",
        data: {
            email: formData.email,
            password: formData.password,
        }
    };
    axios.request(options).then(function (response) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("id_usuario", response.data.data.id_user);
        localStorage.setItem("nombre_usuario", response.data.data.nombre_usuario);
        navigate("/Tablero");
    }).catch(function (error) {
        console.error(error);
    });
  };

  return (
    <div className="login-container-center-horizontal">
        <div className="login-overlap-group">
            <img className="login-group-2 animate-enter" alt="" src={group2} />
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-input-labels neuemontreal-bold-desert-storm-20px">{correoElectronico}</div>
                <input
                    className="login-input-form neuemontreal-bold-dove-gray-18px"
                    id="email"
                    name="email"
                    placeholder={inputPlaceholder1}
                    type={inputType1}
                    required
                    onChange={handleChange}
                />
                <div className="login-input-labels neuemontreal-bold-desert-storm-20px">{contrasea}</div>
                <input
                    className="login-input-form neuemontreal-bold-dove-gray-18px"
                    id="password"
                    name="password"
                    placeholder={inputPlaceholder2}
                    type={inputType2}
                    required
                    onChange={handleChange}
                />
                <button className="login-access-button" type="submit">Iniciar Sesion</button>
            </form>
            <div className="login-texto-extra">
                <span style={{marginBottom:"15px"}}>
                    <span>¿Olvidaste tu contraseña?  </span> 
                    <Link style={{color:"rgb(204, 203, 203)"}}>Recuperala aquí</Link>
                </span>
                <span>
                    <span>¿No tienes una cuenta?  </span> 
                    <Link style={{color:"rgb(204, 203, 203)"}} to="/Registrar">Registrate aquí</Link>
                </span>
            </div>
        </div>
    </div>
  );
}

export default InicioDeSesion;
