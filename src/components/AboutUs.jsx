import {React} from "react";
import "../styles/CSS/AboutUs.css";
import { Link, useNavigate } from "react-router-dom";

function AboutUs(props){
    const { logoWitakNegro, chicaHome, InstaIcon, FaceIcon, TwitIcon, imageCircle, backIcon } = props;
    const navigate = useNavigate();
    return(
        <div className="about-container">
            <div className="about-header">
                <button className="regresar-about" onClick={()=>{navigate("/Inicio")}}>
                    <img src={backIcon} alt=""/>
                    <p>Regresar</p>
                </button>
            </div>
            <div className="about-body animated-element">
                <div className="columna-texto-about">
                    <img src={logoWitakNegro} alt="" className="witak-logo-about"/>
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
                    <img src={imageCircle} alt="" className="circleImg1"/>
                    <img src={imageCircle} alt="" className="circleImg2"/>
                </div>
                <img src={chicaHome} alt="" className="about-image"/>
                <div className='about-barra-azul'></div>
            </div>
            <div className="about-footer">
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

export default AboutUs;