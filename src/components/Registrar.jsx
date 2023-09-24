import {React, useState} from "react";
import { Link } from "react-router-dom";
import "../styles/CSS/Registrar.css";
import "../styles/CSS/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';
import validator from "../Utilities/validator"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registrar(props) {
  const navigate = useNavigate();
  const {
    logoWitakNegro,
    group2,
    title,
    mejoraLaComunicaci,
    numeroTelefono,
    inputType5,
    crearCuenta,
    spanText1,
    spanText2,
    spanText3,
    iniciaSesin,
    nombreDeUsuario,
    inputType1,
    inputPlaceholder1,
    correoElectronico,
    inputType2,
    inputPlaceholder2,
    contrasea,
    inputType3,
    inputPlaceholder3,
    confirmarContrasea,
    inputType4,
    inputPlaceholder4,
    inputPlaceholder5
  } = props;

  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    password: "",
    conpassword: "",
    phone: "",
  })

  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const notify = () => 
    toast.error(
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isPassword(formData.password)){
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
    if (formData.password !== formData.conpassword) {
      setPasswordsMatch(false);
      return;
    }else{
      setPasswordsMatch(true);
    }
    const options = {
      method: "POST",
      url: "https://quiet-wildwood-64002-14321b752be3.herokuapp.com/usuarios/register",
      data: {
        name: formData.name,
        email: formData.mail,
        password: formData.password,
        phone: formData.phone,
      }
    }
    axios.request(options).then(function (response) {
      navigate("/InicioSesion");
    }).catch(function (error) {
      console.error(error);
    })
    const templateParams = {
      to_email: formData.mail,
      message: 'Organiza, colabora y sigue el progreso de tus proyectos de manera fácil y eficiente.'
      +'Simplifica tu trabajo y mantén todo bajo control con WiTaK.'
      +'\n¡Comienza a gestionar tus proyectos de forma efectiva hoy mismo!',
      to_name: formData.name
    };
    emailjs.send('service_vjk9kxd', 'template_68ejdt1', templateParams, 'kg_5ysJdpJrEsa2zm')
      .then(() => {
        toast.success(
          'Correo de registro enviado con éxito',
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
          "Error al enviar el correo de confirmación"+error,
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
  }

  return (
    <div className="register-container-page">
      <div className="home-header">
          <img src={logoWitakNegro} alt="" className="witak-logo-home"/>
          <div className="links-home">
              <Link to="/Inicio" className="home-link-style">Inicio</Link>
              {localStorage.getItem("id_usuario") !== null ? 
                  <Link to="/Tablero" className="home-link-style">Tablero</Link>
                  : 
                  <Link to="/InicioSesion" className="home-link-style">Iniciar sesión</Link>
              }
              <Link to="/QuienesSomos" className="home-link-style">¿Quiénes somos?</Link>
          </div>
      </div>
      <div className="overlap-group">
        <div className="register-column-container-1">
          <h1 className="title animate-enter1">{title}</h1>
          <p className="mejora-la-comunicaci animate-enter2">{mejoraLaComunicaci}</p>
          <div className="rectangle-3 animate-enter">
            <lottie-player
              src="https://lottie.host/49dbf2bf-795f-4c58-be61-26b308c23bd5/fnOswfI4Bv.json"
              background="transparent"
              speed="1"
              autoplay
              loop
            ></lottie-player>
          </div>
        </div>
        <div className="register-column-container-2">
          <form className="flex-col" onSubmit={handleSubmit}>
            <div className="crear-cuenta animate-enter3">{crearCuenta}</div>
            <div className="flex-row">
              <p className="ya-eres-parte-de-witak">
                <span className="neuemontreal-medium-black-17px">{spanText1}</span>
                <span className="span1">{spanText2}</span>
                <span className="neuemontreal-medium-black-17px">{spanText3}</span>
              </p>
              <Link to="/InicioSesion">
                <div className="inicia-sesin neuemontreal-medium-black-17px">{iniciaSesin}</div>
              </Link>
            </div>
            <div className="nombre-de-usuario neuemontreal-bold-black-22px">{nombreDeUsuario}</div>
            <input
              className="input-form neuemontreal-bold-dove-gray-17px"
              id="name"
              name="name"
              type={inputType1}
              required
              onChange={handleChange}
            />
            <div className="flex-col-item neuemontreal-bold-black-22px">{correoElectronico}</div>
            <input
              className="input-form neuemontreal-bold-dove-gray-17px"
              id="mail"
              name="mail"
              type={inputType2}
              required
              onChange={handleChange}
            />
            <div className="flex-col-item neuemontreal-bold-black-22px">{numeroTelefono}</div>
            <input
              className="input-form neuemontreal-bold-dove-gray-17px"
              id="phone"
              name="phone"
              type={inputType5}
              required
              onChange={handleChange}
            />
            <div className="flex-col-item neuemontreal-bold-black-22px">{contrasea}</div>
            <input
              className="input-form neuemontreal-bold-dove-gray-17px"
              id="password"
              name="password"
              type={inputType3}
              required
              onChange={handleChange}
            />
            <div className="flex-col-item neuemontreal-bold-black-22px">{confirmarContrasea}</div>
            <input
              className="input-form neuemontreal-bold-dove-gray-17px"
              id="conpassword"
              name="conpassword"
              type={inputType4}
              required
              onChange={handleChange}
            />
            {!passwordsMatch && <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>Las contraseñas no coinciden</p>}
            <button 
              className="rectangle-9"
              type = "submit"
            >Empieza Ya
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Registrar;