import {React, useState, useEffect} from "react";
import "../styles/CSS/InicioDeSesion.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from 'emailjs-com';

function InicioDeSesion(props) {
  const navigate = useNavigate();

  const [resetPassword, setResetPassword] = useState({
    reset: false,
    email: "",
    pass: "",
    newPass: "",
    token: "",
    tokenSent: false,
    emailSent: false
  });

  const [generado, setGenerado] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    generateCode();
  }, []);

  const generateCode = () => {
    if (generado === false){
      const length = 8;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = 'T-';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      setToken(code);
      setGenerado(true);
    }
  }

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

  const handleReset = (e) => {
    e.preventDefault();
    try{
        setResetPassword({
            ...resetPassword,
            emailSent: true,
        });
        const templateParams = {
            to_email: resetPassword.email,
            message: 'Ingresa el siguiente codigo para cambiar tu contraseña: ' +
                token + '\nSi no solicitaste un cambio de contraseña, ignora este correo.',
        };
        emailjs.send('service_vjk9kxd', 'template_qgp002o', templateParams, 'kg_5ysJdpJrEsa2zm')
        .then(() => {
            alert("Revisa tu correo para cambiar tu contraseña");
        })
        .catch((error) => {
            alert('Error al enviar el correo de recuperacion:', error);           
        });
    } catch (error) {
        if (error.response && error.response.status === 401) {
        alert("Email not found");
        } else {
        alert("An error occurred:", error);
        }
    }
    const options = {
        method: "POST",
        url: "http://localhost:8000/usuarios/reset",
        data: {
            email: resetPassword.email,
            password: resetPassword.pass,
            newPassword: resetPassword.newPass,
        }
    };
    axios.request(options).then(function (response) {
        setResetPassword({
            ...resetPassword,
            reset: false,
        });
    }
    ).catch(function (error) {
        console.error(error);
    });
  }

  return (
    <div className="login-container-center-horizontal">
        <div className="login-overlap-group">
            <img className="login-group-2 animate-enter" alt="" src={group2} />
            {resetPassword.reset === false ? (
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-division-input">
                        <label className="login-input-labels">{correoElectronico}</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="email"
                            name="email"
                            placeholder={inputPlaceholder1}
                            type={inputType1}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="login-division-input">
                        <label className="login-input-labels">Contraseña</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="password"
                            name="password"
                            placeholder={inputPlaceholder2}
                            type={inputType2}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <button className="login-access-button" type="submit">Iniciar Sesion</button>
                </form>
            ) : (resetPassword.tokenSent === false &&
                <form onSubmit={handleReset} className="login-form">
                    <div className="login-division-input">
                        <label className="login-input-labels">{correoElectronico}</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="email"
                            name="email"
                            placeholder={inputPlaceholder1}
                            type={inputType1}
                            required
                            onChange={handleChange}
                        />
                        <button className="enviar-correo"
                            onClick={() => setResetPassword({
                                ...resetPassword,
                                tokenSent: true
                            })}
                        >Enviar Correo
                        </button>
                    </div>
                </form>
            )}
            {resetPassword.tokenSent === true &&
                <form onSubmit={handleReset} className="login-form">
                    <div className="login-division-input">
                        <label className="login-input-labels">Token de Confirmación</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="token"
                            name="token"
                            placeholder="WT-2JA920SL"
                            type={inputType1}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="login-division-input">
                        <label className="login-input-labels">Contraseña Nueva</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="pass"
                            name="pass"
                            placeholder={inputPlaceholder2}
                            type={inputType2}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="login-division-input">
                        <label className="login-input-labels">Confirmar Contraseña</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="password"
                            name="password"
                            placeholder={inputPlaceholder2}
                            type={inputType2}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <button className="cambiar-contra"
                        onClick={() => setResetPassword({
                            ...resetPassword,
                            tokenSent: true
                        })}
                        >Cambiar Contraseña
                    </button>
                </form>
            }
            {resetPassword.reset === false && 
            <div className="login-texto-extra">
                <span style={{marginBottom:"15px"}}>
                    <span>¿Olvidaste tu contraseña?  </span> 
                    <Link style={{color:"rgb(204, 203, 203)"}} 
                        onClick={()=>setResetPassword({
                            ...resetPassword,
                            reset: true,
                        })}
                    >Recuperala aquí</Link>
                </span>
                <span>
                    <span>¿No tienes una cuenta?  </span> 
                    <Link style={{color:"rgb(204, 203, 203)"}} to="/Registrar">Registrate aquí</Link>
                </span>
            </div>
            }
        </div>
    </div>
  );
}

export default InicioDeSesion;
