import { React, useEffect, useState } from "react";
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

    //Formularios
    const [formularioData, setFormularioData] = useState({
        objetivo: "",
        publico: "",
        descripcion: "",
        tono: [],
        diseñador: "",
        tamaño: "",
        fecha_limite: "",
        inspiracion: []
    });

    const handleInputChange = (event) => {
        if(event.target.name === "fecha_limite"){
            let fecha = event.target.value.replace("-", "/");
            fecha += " 23:59:59";
            console.log(formularioData)
            setFormularioData({
                ...formularioData,
                [event.target.name]: fecha
            })
            return;
        }
        setFormularioData({
            ...formularioData,
            [event.target.name]: event.target.value
        })
        console.log(formularioData)
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
                        <textarea type="text" name="objetivo" className="formulario-area" placeholder="Escribe tus objetivos" onChange={handleInputChange}/>
                    </div>
                    <div className="formulario-group">
                        <label className="label-formulario">Publico</label>
                        <textarea type="text" name="publico" className="formulario-area" placeholder="A que publico esta dirigido" onChange={handleInputChange}/>
                    </div>
                </div>
                    <div className="formulario-group" style={{width:"100%"}}>
                    <label className="label-formulario">Descripción</label>
                    <textarea type="text" name="descripcion" className="formulario-area" placeholder="Describe tu proyecto" onChange={handleInputChange}/>
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
                            <label className="label-formulario">Diseñador Grafico</label>
                            <select className="formulario-select" onSelect={handleInputChange} name="diseñador">
                                <option value="" disabled selected>Selecciona un diseñador</option>
                                {designers.map((designer) => (
                                    <option>{designer.nombre_usuario}</option>
                                ))}
                            </select>
                        </div>
                        <div className="formulario-group" style={{width:"100%"}}>
                            <label className="label-formulario">Tamaño</label>
                            <textarea type="text" name="tamaño" className="formulario-area" placeholder="Tamaño de tu post" onChange={handleInputChange}/>
                        </div>
                        <div className="formulario-group" style={{width:"100%"}}>
                            <label className="label-formulario">Fecha Limite</label>
                            <input type="date" className="formulario-date" onChange={handleInputChange} name="fecha_limite"/>
                        </div>
                    </div>
                    <div className="formulario-group" style={{height:"100%"}}>
                        <label className="label-formulario">Inspiración</label>
                        <input type="file" className="formulario-file" onChange={handleInputChange} name="inspiracion"/>
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