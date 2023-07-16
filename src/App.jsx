import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrarContainer from './components/Registrar'
import LoginContainer from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrarContainer {...registrarData}/>} Redirect to="/Registrar"/>
        <Route path="/Registrar" element={<RegistrarContainer {...registrarData}/>}/>
        <Route path="/InicioSesion" element={<LoginContainer {...inicioDeSesionData}/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const registrarData = {
  group2: require("./styles/Images/logo-witak.png"),
  title: <React.Fragment>Optimiza <br />tu trabajo con nosotros.</React.Fragment>,
  mejoraLaComunicaci: <React.Fragment>mejora la comunicación<br />con tu cliente y equipo de trabajo<br />para lograr une ejecución eficiente</React.Fragment>,
  crearCuenta: "Crear cuenta",
  spanText1: "¿Ya eres parte de ",
  spanText2: "WITAK",
  spanText3: "?",
  iniciaSesin: " Inicia sesión",
  nombreDeUsuario: "Nombre de usuario",
  inputType1: "text",
  inputPlaceholder1: "Santiago P.",
  correoElectronico: "Correo electronico",
  inputType2: "text",
  inputPlaceholder2: "witak@gmail.com",
  contrasea: "Contraseña",
  inputType3: "password",
  inputPlaceholder3: "••••••••••••••••",
  confirmarContrasea: "Confirmar contraseña",
  inputType4: "password",
  inputPlaceholder4: "••••••••••••••••",
  numeroTelefono: "Número de teléfono",
  inputType5: "text",
  inputPlaceholder5: "+(504)  9891 - 8825",
};

const inicioDeSesionData = {
  group2: require("./styles/Images/logo-witak.png"),
  correoElectronico: "Correo electronico",
  inputType1: "text",
  inputPlaceholder1: "witak@gmail.com",
  contrasea: "Contraseña",
  inputType2: "password",
  inputPlaceholder2: "••••••••••••••••"
}