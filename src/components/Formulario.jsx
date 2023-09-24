import { React, useEffect, useState,useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CSS/NavigationBar.css'
import '../styles/CSS/Formulario.css'
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import htmlPlantilla from "../plantilla.json";

function Formulario(props){
    const {backIcon, sendIcon, checkIcon, logoWitak} = props;
    const navigate = useNavigate();
    //Conseguir diseñadores
    const [designers, setDesigners] = useState([]);

    useEffect(() => {
        getDesigners();
        getFormulario();
    }, []);
    
    const getDesigners = async () => {
        let options = {
            method: 'GET',
            url: "https://quiet-wildwood-64002-14321b752be3.herokuapp.com/usuarios/getusers",
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
    const [showEnviado, setShowEnviado] = useState(false);

    const handleEnviadoPreview = () => {
        setShowEnviado(!showEnviado);
        setFormularioData({
            ...formularioData,
            formularioP: "none"
        })
        setTimeout(() => {
            setShowEnviado(false);
            setFormularioData({
                ...formularioData,
                formularioP: "block"
            })
            navigate("/Inicio")
        }, 4500)// Hide after 5 seconds
    }

    useEffect(() => {
        getDesigners();
        // Obtener el valor del parámetro de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const parametro = urlParams.get('id_usuario');
        if (parametro === null) {
            return;
        }
        
        setFormularioData({
            ...formularioData,
            id_usuario: parseInt(parametro),
        })
    }, []); // El segundo argumento del useEffect vacío significa que este efecto se ejecuta solo una vez al montar el componente

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
        formularioP: "block",
        nombre_diseñador: "",
        designerMail:"",
        id_diseñador: 0,
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
        
    //     axios.post('https://quiet-wildwood-64002-14321b752be3.herokuapp.com/upload', formDT)
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
            .post('https://quiet-wildwood-64002-14321b752be3.herokuapp.com/upload', formDT)
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
        let options = {
            method: 'POST',
            url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/formularios/crear',
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
        axios.request(options).then(function (response) {
            console.log("Formulario creado con exito");
        }).catch(function (error) {
            console.error(error);
        })

        let nameDesigner = "";
        let correo = ""
        designers.map((designer) => {
            if(designer.id_usuario === formularioData.id_usuario){
                nameDesigner = designer.nombre_usuario;
                correo = designer.correo_usuario;
                console.log(correo)
            }
        })

        let fecha = formularioData.fecha_limite.replace("/", "-");
        let modifiedHtml = htmlPlantilla.html.replace(/{{tamaño_formulario}}/g, formularioData.tamaño);
        modifiedHtml = modifiedHtml.replace(/{{remitente}}/g, nameDesigner);
        modifiedHtml = modifiedHtml.replace(/{{descripcion_formulario}}/g, formularioData.descripcion);
        modifiedHtml = modifiedHtml.replace(/{{objetivo_formulario}}/g, formularioData.objetivo);
        modifiedHtml = modifiedHtml.replace(/{{publico_formulario}}/g, formularioData.publico);
        modifiedHtml = modifiedHtml.replace(/{{tono_formulario}}/g, formularioData.tono);
        modifiedHtml = modifiedHtml.replace(/{{fecha_limite}}/g, fecha);

        

        options = {
            method: 'POST',
            url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/formularios/enviarCorreo',
            data: {
                from: nameDesigner,
                to: correo,
                subject: "Idea de Proyecto",
                text: "",
                html: modifiedHtml,
                attachments: []
            }
        }
        console.log(options.data)
        axios.request(options).then(function (response) {
            console.log("Correo enviado!")
        }).catch(function (error) {
            console.error(error);
        })
    };

    //Llenado de formulario con Board
    const getFormulario = () => {
        if (localStorage.getItem("id_formulario") !== null) {
            const options = {
                method: 'POST',
                url: 'https://quiet-wildwood-64002-14321b752be3.herokuapp.com/formularios/obtenerUno',
                data: { 
                    id_formulario: parseInt(localStorage.getItem("id_formulario"))
                }
            };
            axios.request(options).then(function (response) {
                console.log(response.data)
                let fecha = response.data[0].fecha_limite
                fecha = fecha.replace("T", " ").replace(".000Z", "").replace("-", "/").replace("-", "/");
                setFormularioData({
                    ...formularioData, 
                    nombre: response.data[0].nombre_formulario,
                    objetivo: response.data[0].objetivo_formulario,
                    descripcion: response.data[0].descripcion_formulario,
                    publico: response.data[0].publico_formulario,
                    tono: response.data[0].tono_formulario,
                    tamaño: response.data[0].tamaño_formulario,
                    fecha_limite: fecha, 
                    id_diseñador: response.data[0].id_usuario,                  
                })
            }).catch(function (error) {
              console.error(error);
            });
        }else{
            return;
        }
    }

    return(
        <div className="formularios-container">
            {showEnviado && (
            <div className="formulario-enviado animate-enter">
                <div className="formulario-enviado-row">
                    <h1 className="enviado-exito animate-enter">ENVIADO CON EXITO</h1>
                    <img alt="" src={checkIcon} className="check-icon"/>
                </div>
                <img alt="" src={logoWitak} className="witak-enviado"/>
            </div>
            )}
            <div className="formulario-container-cb animate-enter" style={{display: formularioData.formularioP}}>
                <div className="Formulario-header">
                    {localStorage.getItem("id_formulario") === null ?
                        <Link to="/Inicio"
                            style={{ marginRight: "0.8%", marginLeft: "0.5%" }}>
                            <img src={backIcon} className="formulario-back-icon" alt=""/>
                        </Link>
                        :
                        <Link to="/Tablero"
                            style={{ marginRight: "0.8%", marginLeft: "0.5%" }}>
                            <img src={backIcon} className="formulario-back-icon" alt="" onClick={()=>{localStorage.removeItem("id_formulario")}}/>
                        </Link>
                    }
                    <label className="form-header-title">Creative Board</label>
                </div>
                <div className="Formulario-body">
                    <div className="formulario-body-row">
                        <div className="formulario-group">
                            <label className="label-formulario">Nombre</label>
                            {localStorage.getItem("id_formulario") !== null ?
                                <textarea type="text" name="nombre" value={formularioData.nombre} className="formulario-area" disabled placeholder="Ingresa tu nombre" onChange={handleInputChange}/>
                                :
                                <textarea type="text" name="nombre" className="formulario-area" required placeholder="Ingresa tu nombre" onChange={handleInputChange}/>
                            }
                        </div>
                        <div className="formulario-group">
                            <label className="label-formulario">Público</label>
                            {localStorage.getItem("id_formulario") !== null ?
                                <textarea type="text" name="publico" value={formularioData.publico} className="formulario-area" disabled placeholder="A que público está dirigido" onChange={handleInputChange}/>
                                :
                                <textarea type="text" name="publico" className="formulario-area" required placeholder="A que publico esta dirigido" onChange={handleInputChange}/>
                            }        
                        </div>
                    </div>
                    <div className="formulario-body-row">
                        <div className="formulario-group">
                            <label className="label-formulario">Descripción</label>
                            {localStorage.getItem("id_formulario") !== null ?
                                <textarea type="text" name="descripcion" value={formularioData.descripcion} className="formulario-area" disabled placeholder="Describe tu proyecto" onChange={handleInputChange}/>
                                :
                                <textarea type="text" name="descripcion" className="formulario-area" required placeholder="Describe tu proyecto" onChange={handleInputChange}/>
                            }
                        </div>
                        <div className="formulario-group">
                            <label className="label-formulario">Objetivo</label>
                            {localStorage.getItem("id_formulario") !== null ?
                                <textarea type="text" name="objetivo" value={formularioData.objetivo} className="formulario-area" disabled placeholder="Escribe tus objetivos" onChange={handleInputChange}/>
                                :
                                <textarea type="text" name="objetivo" className="formulario-area" required placeholder="Escribe tus objetivos" onChange={handleInputChange}/>
                            }
                        </div>
                    </div>
                    <div className="formulario-body-row">
                        <div className="formulario-body-column">
                            <div className="formulario-group-tono" >
                                <label className="label-formulario">Tono</label>
                                <div>
                                    {localStorage.getItem("id_formulario") !== null ? 
                                        <div>
                                            {formularioData.tono.split(", ").map((tono) => (
                                                <button className="tono-button">{tono}</button>
                                            ))}
                                        </div>
                                        :
                                        <div className="tono-group">
                                            <button className="tono-button" value="Elegante" name="tono" onClick={(e)=> {handleTono(e)}}>Elegante</button>
                                            <button className="tono-button" value="Jugueton" name="tono" onClick={(e)=> {handleTono(e)}}>Jugueton</button>
                                            <button className="tono-button" value="Ejecutivo" name="tono" onClick={(e)=>{handleTono(e)}}>Ejecutivo</button>
                                            <button className="tono-button" value="Llamativo" name="tono" onClick={(e)=> {handleTono(e)}}>Llamativo</button>
                                            <button className="tono-button" value="Persuasivo" name="tono" onClick={(e)=> {handleTono(e)}}>Persuasivo</button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="formulario-group-column" style={{width:"100%"}}>
                                <label className="label-formulario">Tamaño</label>
                                {localStorage.getItem("id_formulario") !== null ?
                                    <textarea type="text" name="tamaño" value={formularioData.tamaño} disabled className="formulario-area" placeholder="Tamaño de tu post" onChange={handleInputChange}/>
                                    :  
                                    <textarea type="text" name="tamaño" required className="formulario-area" placeholder="Tamaño de tu post" onChange={handleInputChange}/>
                                }
                            </div>
                            <div className="formulario-group-column" style={{width:"100%"}}>
                                <label className="label-formulario">Fecha Limite</label>
                                {localStorage.getItem("id_formulario") !== null ?
                                    <input type="text" value={formularioData.fecha_limite} className="formulario-date" disabled onChange={handleInputChange} name="fecha_limite"/>
                                    :
                                    <input type="date" className="formulario-date" required onChange={handleInputChange} name="fecha_limite"/>
                                }
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
                    {localStorage.getItem("id_formulario") !== null ? null :
                    <button className="formulario-button-send" onClick={(e)=>(handleEnviadoPreview(), handleSubmit(e))}>
                        <label className="formulario-button-label">Enviar Formulario</label>
                        <img src={sendIcon} alt="" className="formulario-send-icon"/>
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default Formulario;