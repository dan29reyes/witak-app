import {React} from "react";
import "../styles/CSS/AboutUs.css";
import { Link, useNavigate } from "react-router-dom";

function AboutUs(props){
    const { logoWitakNegro, chicaHome, InstaIcon, FaceIcon, TwitIcon, imageCircle, backIcon } = props;
    const navigate = useNavigate();
    return(
        <div className="about-container">
            <div className="home-header">
                <img src={logoWitakNegro} alt="" className="witak-logo-home"/>
                <div className="links-home">
                    {localStorage.getItem("id_usuario") !== null ? 
                        <Link to="/Tablero" className="home-link-style">Tablero</Link>
                        : 
                        <Link to="/InicioSesion" className="home-link-style">Iniciar sesión</Link>
                    }
                    <Link to="/Registrar" className="home-link-style">Registrarse</Link>
                    <Link to="/Formularios" className="home-link-style">Contacta un Diseñador</Link>
                </div>
            </div>
            <div className="about-body animated-element">
                <div className="columna-texto-about">
                    <h1 className="about-text-1">¿Quiénes somos?</h1>
                    <h3 className="about-text-3">
                        Witak está diseñada para ayudar a los diseñadores
                        gráficos a superar los desafíos de la organización y
                        gestión de proyectos, permitiéndoles enfocarse en su
                        creatividad y producir trabajos de alta calidad de
                        manera más eficiente. Ya sea para diseñadores
                        independientes o equipos creativos, Witak es una
                        herramienta poderosa y versátil que se convierte en un
                        compañero esencial para el exito en el mundo del
                        diseño grafico.
                    </h3>
                </div>
                <img src={chicaHome} alt="" className="about-image"/>
            </div>
            <div className="home-footer">
                <Link to="https://www.instagram.com/witak.co/">
                    <img src={InstaIcon} alt="" style={{ height: "35px" }} />
                    <img src={imageCircle} alt="" className="circleImg1-home"/>
                    <img src={imageCircle} alt="" className="circleImg2-home"/>
                </Link>
                <Link>
                    <img src={FaceIcon} alt="" style={{ height: "35px" }} />
                </Link>
                <Link>
                    <img src={TwitIcon} alt="" style={{ height: "35px", borderRadius:"8px"}} />
                </Link>
            </div>
        </div>
    );
}

export default AboutUs;