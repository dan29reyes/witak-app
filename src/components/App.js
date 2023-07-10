import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import LoginContainer from "../pages/login";
// import ProjectContainer from "../pages/Project";
// import BoardContainer from "../pages/Boards";
// import RegisterContainer from "../pages/Register";
// import OlvidePasswordPage from '../pages/OlvidePass';
// import HomeContainer from '../pages/Home';
import FormulariosContainer from '../pages/Formularios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormulariosContainer/>} Redirect to="/Formularios"/>
        {/* <Route path="/InicioSesion" element={<LoginContainer/>}/> */}
        {/* <Route path="/Proyecto" element={<ProjectContainer/>}/> */}
        {/* <Route path="/Tablero" element={<BoardContainer/>}/> */}
        {/* <Route path="/Registro" element={<RegisterContainer/>}/> */}
        {/* <Route path="/Olvide" element={<OlvidePasswordPage/>}/> */}
        {/* <Route path="/Home" element={<HomeContainer/>}/> */}
        <Route path="/Formularios" element={<FormulariosContainer/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;