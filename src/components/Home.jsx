import React from "react";
import { Link } from "react-router-dom";
import "../styles/CSS/Home.css"

function Home(props) {
    const { logoWitakNegro, chicaHome, InstaIcon, FaceIcon, TwitIcon, imageCircle } = props;

    return (
        <div className="home-container">
            <div className="home-header">
                <img src={logoWitakNegro} alt="" className="witak-logo-home"/>
                <div className="links-home">
                    <Link to="/InicioSesion" className="home-link-style">Iniciar sesión</Link>
                    <Link to="/Registrar" className="home-link-style">Registrarse</Link>
                    <Link to="/QuienesSomos" className="home-link-style">¿Quiénes somos?</Link>
                </div>
            </div>
            <div className="home-body">
                <div style={{marginTop:"5%"}}>
                    <h1 className="home-text-1">Todo lo que necesitas</h1>
                    <h1 className="home-text-1">Para optimizar tu trabajo</h1>
                    <h2 className="home-text-2">Expresa mejor tus ideas</h2>
                    <h3 className="home-text-3">
                        mejora la comunicacion con tu cliente y equipo de 
                        trabajo para lograr una ejecucion eficiente
                    </h3>
                    <Link to="/Registrar">
                        <button className="home-comenzar">Comenzar</button>
                    </Link>
                    <img src={imageCircle} alt="" style={{width:"20%"}}/>
                    <img src={imageCircle} alt="" style={{width:"20%"}}/>
                </div>
                <img src={chicaHome} alt="" className="home-image" style={{width:"45%", marginTop:"1%"}}/>
            </div>
            <div className="home-footer">
                <Link to="https://www.instagram.com/witak.co/">
                    <img src={InstaIcon} alt="" style={{ height: "35px" }} />
                </Link>
                <Link>
                    <img src={FaceIcon} alt="" style={{ height: "35px" }} />
                </Link>
                <Link>
                    <img src={TwitIcon} alt="" style={{ height: "35px" }} />
                </Link>
            </div>
        </div>
    );
}

export default Home;