import {React, useState, useEffect} from "react";
import "../styles/CSS/InicioDeSesion.css";
import "../styles/CSS/Home.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from 'emailjs-com';
import validator from '../Utilities/validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    logoWitakNegro,
    inputType2,
    inputPlaceholder2,
    InstaIcon,
    FaceIcon,
    TwitIcon,
    imageCircle,
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

    const handleFormChange = (e) => {
        setResetPassword({
            ...resetPassword,
            [e.target.name]: e.target.value,
        });
    };

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!validator.isEmail(formData.email) || !validator.isPassword(formData.password)){
        setErrors({
            ...errors,
            general: "Los datos ingresados no son validos"
        });
    }else{
        setErrors({
            ...errors,
            email: "",
            password: "",
            general: ""
        });
    }

    if(!validator.isEmail(formData.email)){
        setErrors({
            ...errors,
            email: "El correo no es valido",
            general: "La contraseña no es valida"
        });
    }

    if(!validator.isPassword(formData.password)){
        setErrors({
            ...errors,
            password: "La contraseña no es valida",
            general: "La contraseña no es valida"
        });
    }

    if(!errors.email && !errors.password && !errors.general){
        const options = {
            method: "POST",
            url: "https://quiet-wildwood-64002-14321b752be3.herokuapp.com/usuarios/login",
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
    }
  };

  const handleReset = (e) => {
    try{
        setResetPassword({
            ...resetPassword,
            emailSent: true,
            tokenSent: true
        });
        const templateParams = {
            to_email: resetPassword.email,
            message: 'Ingresa el siguiente codigo para cambiar tu contraseña: ' +
                token + '\nSi no solicitaste un cambio de contraseña, ignora este correo.',
        };
        emailjs.send('service_vjk9kxd', 'template_68ejdt1', templateParams, 'kg_5ysJdpJrEsa2zm')
        .then(() => {
            toast.info(
                "Revisa tu correo para cambiar tu contraseña",
                { 
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                }
            );
        })
        .catch((error) => {
            toast.error(
                'Error al enviar el correo de recuperacion:'+error,
                { 
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
            );           
        });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error(
                "Email not found",
                { 
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
            );
        } else {
            toast.error(
                "An error occurred:"+error,
                { 
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
            );
        }
    }
  }

  const handleCambiar = (e) => {
    e.preventDefault();
    try{
        if(resetPassword.token === token){
            if(resetPassword.pass === resetPassword.newPass){
                if (!validator.isPassword(resetPassword.pass)){
                    toast.error(
                      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un simbolo de los siguientes: !@#$%^&* y un número",
                      { 
                        position: "top-center",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                      }
                    );
                    return;
                  }
                const options = {
                    method: "POST",
                    url: "https://quiet-wildwood-64002-14321b752be3.herokuapp.com/usuarios/forgot-password",
                    data: {
                        email: resetPassword.email,
                        password: resetPassword.newPass,
                    }
                };
                axios.request(options).then(function (response) {
                    toast.success(
                        "Contraseña cambiada exitosamente",
                        { 
                            position: "top-center",
                            autoClose: 3500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        }
                    );
                    setResetPassword({
                        ...resetPassword,
                        emailSent: false,
                        tokenSent: false,
                        reset: false
                    });
                }).catch(function (error) {
                    console.error(error);
                });
                console.log("pong")
            }else{
                toast.error(
                    "Las contraseñas no coinciden",
                    { 
                        position: "top-center",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    }
                );
            }
        }else{
            toast.error(
                "El token ingresado es incorrecto",
                { 
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
            );
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error(
                "Email not found",
                { 
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
            );
        } else {
            toast.error(
                "An error occurred:"+error,
                { 
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
            );
        }
    }
  }

  return (
    <div className="login-container-center-horizontal">
        <div className="home-header">
          <img src={logoWitakNegro} alt="" className="witak-logo-home"/>
          <div className="links-home">
                <Link to="/Inicio" className="home-link-style">Inicio</Link>
                <Link to="/Registrar" className="home-link-style">Registrarse</Link>
                <Link to="/QuienesSomos" className="home-link-style">¿Quiénes somos?</Link>
          </div>
      </div>
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
                            type={inputType2}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <label className="error">
                        {errors.general}
                    </label>
                    <button className="login-access-button" type="submit">Iniciar Sesion</button>
                </form>
            ) : (resetPassword.tokenSent === false &&
                <form className="login-form" onSubmit={handleReset}>
                    <div className="login-division-input">
                        <label className="login-input-labels">{correoElectronico}</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="email"
                            name="email"
                            type={inputType1}
                            required
                            onChange={handleFormChange}
                        />
                        <button type='submit' className="enviar-correo">Enviar Correo</button>
                    </div>
                </form>
            )}
            {resetPassword.tokenSent === true &&
                <form onSubmit={handleCambiar} className="login-form">
                    <div className="login-division-input">
                        <label className="login-input-labels">Token de Confirmación</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="token"
                            name="token"
                            type={inputType1}
                            required
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="login-division-input">
                        <label className="login-input-labels">Contraseña Nueva</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="pass"
                            name="pass"
                            type={inputType2}
                            required
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="login-division-input">
                        <label className="login-input-labels">Confirmar Contraseña</label>
                        <input
                            className="login-input-form neuemontreal-bold-dove-gray-18px"
                            id="newPass"
                            name="newPass"
                            type={inputType2}
                            required
                            onChange={handleFormChange}
                        />
                    </div>
                    <button type='submit' className="cambiar-contra">Cambiar Contraseña</button>
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
        <ToastContainer />
    </div>
  );
}

export default InicioDeSesion;