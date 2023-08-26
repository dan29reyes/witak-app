import { React, useEffect, useState,useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CSS/NavigationBar.css'
import '../styles/CSS/Formulario.css'
import axios from 'axios';
import { Link } from "react-router-dom";

function Formulario(props){
    const {backIcon, sendIcon} = props;

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
        tono: "",
        nombre: "",
        tamaño: "",
        fecha_limite: "",
        inspiracion: [],
        id_usuario: 0,
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
        if(event.target.name === "diseñador"){
            let id = 0;
            designers.map((designer) => {
                if(designer.nombre_usuario === event.target.value){
                    id = designer.id_usuario;
                }
            })
            setFormularioData({
                ...formularioData,
                [event.target.name]: event.target.value,
                id_usuario: id
            })
            console.log(formularioData)
            return;
        }
        setFormularioData({
            ...formularioData,
            [event.target.name]: event.target.value,
        })
        console.log(formularioData)
    }

    const fileInputRef = useRef(null);

    const handleIconClick = (ref) => {
        ref.current.click();
    };

    const handleTono = (e) => {
        if (formularioData.tono === "") {
            setFormularioData({
                ...formularioData,
                tono: e.target.value,
            });
        } else {
            setFormularioData({
                ...formularioData,
                tono: formularioData.tono + ", "+ e.target.value
            });
        }
        console.log(formularioData)
    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file && file.type === 'application/pdf') {
    //     const formDT = new FormData();
    //     formDT.append('pdf', file);
        
    //     axios.post('http://localhost:8000/upload', formDT)
    //         .then((response) => {
    //         setFormularioData({
    //             ...formularioData,
    //             pdf: response.data
    //         });
    //         })
    //         .catch((error) => {
    //         console.error(error);
    //         });
    //     } else {
    //     console.error('Invalid file type. Only PDF files are allowed.');
    //     }
    // };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
        const formDT = new FormData();
        formDT.append('pdf', file);
        
        axios
            .post('http://localhost:8000/upload', formDT)
            .then((response) => {
            setFormularioData({
                ...formularioData,
                pdf: {
                filename: response.data.filename,
                originalname: response.data.originalname,
                path: response.data.path,
                },
            });
            })
            .catch((error) => {
            console.error(error);
            });
        } else {
        console.error('Invalid file type. Only PDF files are allowed.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/formularios/crear',
            data: {
                nombre_formulario: formularioData.nombre, 
                objetivo_formulario: formularioData.objetivo, 
                descripcion_formulario: formularioData.descripcion,
                publico_formulario: formularioData.publico, 
                tono_formulario: formularioData.tono, 
                fecha_limite: formularioData.fecha_limite,
                id_usuario: formularioData.id_usuario,
                tamaño_formulario: formularioData.tamaño,
            }
        };
        console.log(options.data)
        axios.request(options).then(function (response) {
            console.log(response.data);
            alert("Formulario creado con exito");
        }).catch(function (error) {
            console.error(error);
        })
    };
    
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
                        <label className="label-formulario">Nombre</label>
                        <textarea type="text" name="nombre" className="formulario-area" required placeholder="Ingresa tu nombre" onChange={handleInputChange}/>
                    </div>
                    <div className="formulario-group">
                        <label className="label-formulario">Publico</label>
                        <textarea type="text" name="publico" className="formulario-area" required placeholder="A que publico esta dirigido" onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="formulario-body-row">
                    <div className="formulario-group">
                        <label className="label-formulario">Descripción</label>
                        <textarea type="text" name="descripcion" className="formulario-area" required placeholder="Describe tu proyecto" onChange={handleInputChange}/>
                    </div>
                    <div className="formulario-group">
                        <label className="label-formulario">Objetivo</label>
                        <textarea type="text" name="objetivo" className="formulario-area" required placeholder="Escribe tus objetivos" onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="formulario-body-row">
                    <div className="formulario-body-column">
                        <div className="formulario-group-tono" >
                            <label className="label-formulario">Tono</label>
                            <div className="tono-group">
                                <button className="tono-button" value="Elegante" name="tono" onClick={(e)=> {handleTono(e)}}>Elegante</button>
                                <button className="tono-button" value="Jugueton" name="tono" onClick={(e)=> {handleTono(e)}}>Jugueton</button>
                                <button className="tono-button" value="Ejecutivo" name="tono" onClick={(e)=>{handleTono(e)}}>Ejecutivo</button>
                                <button className="tono-button" value="Llamativo" name="tono" onClick={(e)=> {handleTono(e)}}>Llamativo</button>
                                <button className="tono-button" value="Persuasivo" name="tono" onClick={(e)=> {handleTono(e)}}>Persuasivo</button>
                            </div>
                        </div>
                        <div className="formulario-group" style={{width:"100%"}}>
                            <label className="label-formulario">Diseñador Grafico</label>
                            <select className="formulario-select" required onChange={(e)=>handleInputChange(e)} name="diseñador">
                                <option value="" disabled selected>Selecciona un diseñador</option>
                                {designers.map((designer) => (
                                    <option value={designer.nombre_usuario}>{designer.nombre_usuario}</option>
                                ))}
                            </select>
                        </div>
                        <div className="formulario-group" style={{width:"100%"}}>
                            <label className="label-formulario">Tamaño</label>
                            <textarea type="text" name="tamaño" required className="formulario-area" placeholder="Tamaño de tu post" onChange={handleInputChange}/>
                        </div>
                        <div className="formulario-group" style={{width:"100%"}}>
                            <label className="label-formulario">Fecha Limite</label>
                            <input type="date" className="formulario-date" required onChange={handleInputChange} name="fecha_limite"/>
                        </div>
                    </div>
                    <div className="formulario-group-file">
                        <label className="label-formulario">Inspiración</label>
                        <label 
                            for="images" 
                            className="formulario-file" 
                            onDragOver={handleDragOver} 
                            onDrop={(e) => handleDrop(e, 1)}>
                            <span className="drop-title">Arrastra un archivo</span>
                            o
                            <input type="file" onClick={() => handleIconClick(fileInputRef)} name="inspiracion"/>
                        </label>
                    </div>
                </div>
            </div>
            <div className="Formulario-footer">
                <button className="formulario-button-send" onClick={(e)=>(handleSubmit(e))}>
                    <label className="formulario-button-label">Enviar Formulario</label>
                    <img src={sendIcon} alt="" className="formulario-send-icon"/>
                </button>
            </div>
        </div>
    )
}

export default Formulario;