import {React, useState} from "react";
import { Link } from "react-router-dom";
import "../styles/CSS/Registrar.css";
import axios from "axios";

function Registrar(props) {
  const {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.conpassword) {
      setPasswordsMatch(false);
      return;
    }else{
      setPasswordsMatch(true);
    }
    const options = {
      method: "POST",
      url: "http://localhost:8000/usuarios/register",
      data: {
        name: formData.name,
        email: formData.mail,
        password: formData.password,
        phone: formData.phone,
      }
    }
    axios.request(options);
  }

  return (
    <div className="container-center-horizontal">
      <div className="overlap-group">
        <img src={group2} className="group-2" alt=""/>
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
          placeholder={inputPlaceholder1}
          type={inputType1}
          required
          onChange={handleChange}
        />
        <div className="flex-col-item neuemontreal-bold-black-22px">{correoElectronico}</div>
        <input
          className="input-form neuemontreal-bold-dove-gray-17px"
          id="mail"
          name="mail"
          placeholder={inputPlaceholder2}
          type={inputType2}
          required
          onChange={handleChange}
        />
        <div className="flex-col-item neuemontreal-bold-black-22px">{numeroTelefono}</div>
        <input
          className="input-form neuemontreal-bold-dove-gray-17px"
          id="phone"
          name="phone"
          placeholder={inputPlaceholder5}
          type={inputType5}
          required
          onChange={handleChange}
        />
        <div className="flex-col-item neuemontreal-bold-black-22px">{contrasea}</div>
        <input
          className="input-form neuemontreal-bold-dove-gray-17px"
          id="password"
          name="password"
          placeholder={inputPlaceholder3}
          type={inputType3}
          required
          onChange={handleChange}
        />
        <div className="flex-col-item neuemontreal-bold-black-22px">{confirmarContrasea}</div>
        <input
          className="input-form neuemontreal-bold-dove-gray-17px"
          id="conpassword"
          name="conpassword"
          placeholder={inputPlaceholder4}
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
  );
}

export default Registrar;