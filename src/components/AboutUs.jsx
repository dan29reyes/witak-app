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
                    <Link to="/Inicio" className="home-link-style">Inicio</Link>
                    {localStorage.getItem("id_usuario") !== null ? 
                        <Link to="/Tablero" className="home-link-style">Tablero</Link>
                        : 
                        <Link to="/InicioSesion" className="home-link-style">Iniciar sesión</Link>
                    }
                    <Link to="/Registrar" className="home-link-style">Registrarse</Link>
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
                        compañero esencial para el éxito en el mundo del
                        diseño grafico.
                    </h3>
                </div>
                <img src={chicaHome} alt="" className="about-image"/>
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

export default AboutUs;