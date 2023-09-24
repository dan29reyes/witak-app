import {React, useState} from "react";
import { Link } from "react-router-dom";
import "../styles/CSS/Home.css"

function Home(props) {
    const { logoWitakNegro, chicaHome, InstaIcon, FaceIcon, TwitIcon, imageCircle } = props;

    return (
        <div className="home-container">
            <div className="home-header">
                <img src={logoWitakNegro} alt="" className="witak-logo-home"/>
                <div className="links-home">
                    {localStorage.getItem("id_usuario") !== null ? 
                        <Link to="/Tablero" className="home-link-style">Tablero</Link>
                        : 
                        <Link to="/InicioSesion" className="home-link-style">Iniciar sesión</Link>
                    }
                    <Link to="/Registrar" className="home-link-style">Registrarse</Link>
                    <Link to="/QuienesSomos" className="home-link-style">¿Quiénes somos?</Link>
                </div>
            </div>
            <div className="home-body animated-element">
                <div className="columna-texto">
                    <h1 className="home-text-1">Todo lo que necesitas</h1>
                    <h1 className="home-text-1">Para optimizar tu trabajo</h1>
                    <h2 className="home-text-2">Expresa mejor tus ideas</h2>
                    <h3 className="home-text-3">
                        Mejora la comunicación con tu cliente y equipo de 
                        trabajo para lograr una ejecución eficiente
                    </h3>
                    <Link to="/Registrar">
                        <button className="home-comenzar">Comenzar</button>
                    </Link>
                </div>
                <img src={chicaHome} alt="" className="home-image"/>
            </div>
            <img src={imageCircle} alt="" className="circleImg1-home"/>
            <img src={imageCircle} alt="" className="circleImg2-home"/>
            <div className="home-footer">
                <div className="footer-upper">
                    <div className="contact-email-footer">
                        <p>Contactanos</p>
                        <a href="mailto:hnwitak@gmail.com" style={{color: "white"}}>hnwitak@gmail.com</a>
                    </div>
                    <div className="redes-footer">
                        <p>Redes Sociales</p>
                        <Link to="https://www.instagram.com/witak.co/">
                            <img src={InstaIcon} alt="" style={{ height: "30px", marginRight: "10px" }} />
                        </Link>
                        <Link to="https://www.facebook.com/">
                            <img src={FaceIcon} alt="" style={{ height: "25px" , marginRight: "10px" }} />
                        </Link>
                        <Link>
                            <img src={TwitIcon} alt="" style={{ height: "25px", borderRadius:"6px" }} />
                        </Link>
                    </div>
                </div>
                <div className="white-line-footer"/>
                <div className="rights-footer">
                    <p>&copy; Witak 2023. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;