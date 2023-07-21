import { React, useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CSS/NavigationBar.css'
import '../styles/CSS/Formulario.css'
import axios from 'axios';
import { Link } from "react-router-dom";

function Formulario(props){
    const {backIcon} = props;

    //Conseguir diseñadores
    const [designers, setDesigners] = useState([]);

    useEffect(() => {
        getDesigners();
    }, []);
    
    const getDesigners = async () => {
        let options = {
            method: 'GET',
            url: "http://localhost:8000/usuarios/getusers",
            data:{}
        }
        axios.request(options).then(function (response) {
            setDesigners(response.data.data);
        }
        ).catch(function (error) {
            console.error(error);
        });
    }
    
    return(
        <div className="formulario-container">
            <div className="Formulario-header">
                <Link to="/Inicio"
                    style={{ marginRight: "0.8%", marginLeft: "0.5%" }}>
                    <img src={backIcon} className="formulario-back-icon" alt="" />
                </Link>
                <label className="form-header-title">Creative Board</label>
            </div>
            <div className="Formulario-body">
                <div className="formulario-body-row">
                    <div className="formulario-group">
                        <label className="label-formulario">Objetivo</label>
                        <textarea type="text" className="formulario-area" placeholder="Escribe tus objetivos" />
                    </div>
                    <div className="formulario-group">
                        <label className="label-formulario">Diseñador Grafico</label>
                        <select className="formulario-select">
                            <option value="" disabled selected>Selecciona un diseñador</option>
                            {designers.map((designer) => (
                                <option>{designer.nombre_usuario}</option>
                            ))}
                        </select>
                    </div>
                </div>
                    <div className="formulario-group" style={{width:"100%"}}>
                    <label className="label-formulario">Descripción</label>
                    <textarea type="text" className="formulario-area" placeholder="Describe tu proyecto" />
                </div>
                <div className="formulario-body-row">
                    <div className="formulario-body-column">
                        <div className="formulario-group" style={{width:"100%"}}>
                            <label className="label-formulario">Tono</label>
                            <div className="tono-group">
                                <button className="tono-button">Elegante</button>
                                <button className="tono-button">Jugueton</button>
                                <button className="tono-button">Ejecutivo</button>
                                <button className="tono-button">Llamativo</button>
                                <button className="tono-button">Persuasivo</button>
                            </div>
                        </div>
                        <div className="formulario-group" style={{width:"100%"}}>
                            <label className="label-formulario">Publico</label>
                            <textarea type="text" className="formulario-area" placeholder="A que publico esta dirigido" />
                        </div>
                        <div className="formulario-group" style={{width:"100%"}}>
                            <label className="label-formulario">Tamaño</label>
                            <textarea type="text" className="formulario-area" placeholder="Tamaño de tu post" />
                        </div>
                        <div className="formulario-group" style={{width:"100%"}}>
                            <label className="label-formulario">Fecha Limite</label>
                            <input type="date" className="formulario-date" />
                        </div>
                    </div>
                    <div className="formulario-group" style={{height:"100%"}}>
                        <label className="label-formulario">Inspiración</label>
                        <input type="file" className="formulario-file"/>
                    </div>
                </div>

            </div>
            <div className="Formulario-footer">
                <button className="formulario-button">Enviar Formulario</button>
            </div>
        </div>
    )
}

export default Formulario;