import { useState, useRef } from "react";
import "../styles/Formularios.css";
import axios from "axios";
import uploadIcon from "../images/upload-icon.png";
import htmlPlantilla from "../plantilla.json";

function Formularios() {
  const [formData, setFormData] = useState({
    idea: "",
    remitente: "",
    objetivo: "",
    descripcion: "",
    publico: "",
    tono: "",
    usuario: "",
    fecha_limite: "",
    pdf: "",
  });

  const fileInputRef = useRef(null);

  const handleIconClick = (ref) => {
    ref.current.click();
  };

  const handleTono = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      tono: e.target.value,
    });
    console.log(formData.tono);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file && file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('pdf', file);
      
      axios
        .post('http://localhost:8000/upload', formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('Invalid file type. Only PDF files are allowed.');
    }
  };
  
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          pdf: file,
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Invalid file type. Only PDF files are allowed.');
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      let fecha = formData.fecha_limite.replace("/", "-") + " 23:59:59";
      let options = {
        method: 'POST',
        url: 'http://localhost:8000/formularios/crear',
        data: {
          idea_formulario: formData.idea,
          nombre_formulario: formData.remitente,
          objetivo_formulario: formData.objetivo,
          descripcion_formulario: formData.descripcion,
          publico_formulario: formData.publico,
          tono_formulario: formData.tono,
          id_usuario: 2,
          fecha_limite: fecha,
        },
      };
      //.request(options);

      let modifiedHtml = htmlPlantilla.html.replace(/{{idea_formulario}}/g, formData.idea);
      modifiedHtml = modifiedHtml.replace(/{{remitente}}/g, formData.remitente);
      modifiedHtml = modifiedHtml.replace(/{{descripcion_formulario}}/g, formData.descripcion);
      modifiedHtml = modifiedHtml.replace(/{{objetivo_formulario}}/g, formData.objetivo);
      modifiedHtml = modifiedHtml.replace(/{{publico_formulario}}/g, formData.publico);
      modifiedHtml = modifiedHtml.replace(/{{tono_formulario}}/g, formData.tono);
      modifiedHtml = modifiedHtml.replace(/{{fecha_limite}}/g, fecha);

      options = {
        method: 'POST',
        url: 'http://localhost:8000/formularios/enviarCorreo',
        data: {
          from: formData.remitente,
          to: 'dan29reyes@gmail.com',
          subject: formData.idea,
          text: "",
          html: modifiedHtml,
          attachments: formData.pdf,
        }
      }
      console.log(options.data)
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    }catch(error){
      throw(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid">
      <h1 className="form-h1-title">Formularios</h1>
      <div className="background">
        <div className="form-container">
          <label className="form-labels" htmlFor="idea">
            Idea
          </label>
          <input
            type="text"
            name="idea"
            id="idea"
            className="form-inputs"
            value={formData.idea}
            onChange={handleChange}
            style={{ width: "30%"}}
          />
          <label className="form-labels" htmlFor="remitente">
            Remitente
          </label>
          <input
            type="text"
            name="remitente"
            id="remitente"
            className="form-inputs"
            value={formData.remitente}
            onChange={handleChange}
            style={{ width: "30%" }}
          />
          <label className="form-labels" htmlFor="descripcion">
              Descripción
          </label>
          <textarea
              name="descripcion"
              id="descripcion"
              className="form-inputs"
              value={formData.descripcion}
              onChange={handleChange}
              style={{ width: "90%", resize: "none" }}
          />
          <label className="form-labels" htmlFor="objetivo">
            Objetivo
          </label>
          <input
            type="text"
            name="objetivo"
            id="objetivo"
            className="form-inputs"
            value={formData.objetivo}
            onChange={handleChange}
            style={{ width: "30%"}}
          />
          <label className="form-labels" htmlFor="publico">
            Público
          </label>
          <input
            type="text"
            name="publico"
            id="publico"
            className="form-inputs"
            value={formData.publico}
            onChange={handleChange}
            style={{ width: "30%"}}
          />
          <label className="form-labels" htmlFor="tono">
            Tono
          </label>
          <div className="button-group">
            <button value={"Elegante"} onClick={handleTono}>
              Elegante
            </button>
            <button value={"Jugueton"} onClick={handleTono}>
              Jugueton
            </button>
            <button value={"Ejecutivo"} onClick={handleTono}>
              Ejecutivo
            </button>
            <button value={"LLamativo"} onClick={handleTono}>
              LLamativo
            </button>
            <button value={"Persuasivo"} onClick={handleTono}>
              Persuasivo
            </button>
          </div>
          <label className="form-labels" htmlFor="usuario">
            Usuario
          </label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            className="form-inputs"
            value={formData.usuario}
            onChange={handleChange}
            style={{ width: "30%" }}
          />
          <label className="form-labels" htmlFor="fecha_limite">
            Fecha limite
          </label>
          <input
            type="date"
            name="fecha_limite"
            id="fecha_limite"
            value={formData.fecha_limite}
            onChange={handleChange}
            style={{ width: "30%" }}
          />
          <div className="image-container">
            <div
            className="image-drag-area"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 1)}
            >
              <input
                type="file"
                name="pdf"
                id="pdf"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              {formData.pdf ? (
                <div>
                  <p>PDF file: {formData.pdf.name}</p>
                </div>
              ) : (
                <div className="image-icon" onClick={() => handleIconClick(fileInputRef)}>
                  <img src={uploadIcon} alt="Upload Icon" />
                  <p className="image-text">Upload PDF</p>
                </div>
              )}
            </div>
          </div>
          <button className="form-button" type="submit" onClick={handleSubmit}>
              Enviar Formulario
          </button>
        </div>
      </div>
    </div>
)}

export default Formularios;