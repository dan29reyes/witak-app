import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrarContainer from './components/Registrar'
import LoginContainer from './components/Login'
import BoardContainer from './components/BoardList'
import HomeContainer from './components/Home'
import FormContainer from './components/Formulario'
import AboutUs from './components/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomeContainer {...homeData}/>} Redirect to="/Inicio"/>
        <Route path="/Registrar" element={<RegistrarContainer {...registrarData}/>}/>
        <Route path="/Tablero" element={<BoardContainer {...boardListData}/>}/>
        <Route path="/InicioSesion" element={<LoginContainer {...inicioDeSesionData}/>}/>
        <Route path="/Inicio" element={<HomeContainer {...homeData}/>}/>
        <Route path="/Formularios" element={<FormContainer {...formularioData}/>} />
        <Route path="/QuienesSomos" element={<AboutUs {...aboutData}/>} />
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

const boardListData = {
  group2: require("./styles/Images/logo-witak.png"),
  notificationImg: require("./styles/Images/campana-noti.png"),
  menuImg: require("./styles/Images/menu-bars.png"),
  homeIcon: require("./styles/Images/home-icon.png"),
  taskIcon: require("./styles/Images/task-icon.png"),
  formIcon: require("./styles/Images/form-icon.png"),
  pencilIcon: require("./styles/Images/pencil-icon.png"),
  trianguloIcon: require("./styles/Images/triangulo-notificacion.png"),
  closeIcon: require("./styles/Images/close-icon.png"),
}

const homeData = {
  logoWitakNegro: require("./styles/Images/logo-witak.png"), 
  chicaHome: require("./styles/Images/chica-home.png"),
  InstaIcon: require("./styles/Images/instagram-icon.png"),
  FaceIcon: require("./styles/Images/facebook-icon.png"),
  TwitIcon: require("./styles/Images/twitter-icon.png"),
  imageCircle: require("./styles/Images/circles-white.png"),
}

const aboutData = {
  logoWitakNegro: require("./styles/Images/logo-witak.png"), 
  chicaHome: require("./styles/Images/chica-home.png"),
  InstaIcon: require("./styles/Images/instagram-icon.png"),
  FaceIcon: require("./styles/Images/facebook-icon.png"),
  TwitIcon: require("./styles/Images/twitter-icon.png"),
  imageCircle: require("./styles/Images/circles-white.png"),
  backIcon: require("./styles/Images/backIcon.png")
}

const formularioData = {
  backIcon: require("./styles/Images/backIcon.png")
}