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
    img1: null,
    img2: null,
    img3: null,
    img4: null,
  });

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);

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

  const handleFileChange = (e, imgNumber) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = image.width;
        let height = image.height;

        console.log(width)
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
  
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
  
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          const reader = new FileReader();
  
          reader.onloadend = () => {
            const imageData = reader.result;
  
            setFormData((prevState) => ({
              ...prevState,
              [`img${imgNumber}`]: {
                name: resizedFile.name,
                data: imageData,
                preview: URL.createObjectURL(resizedFile), // Add image preview
              },
            }));
          };
  
          reader.readAsDataURL(resizedFile);
        }, file.type);
  
        image.src = reader.result;
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    reader.readAsDataURL(file);
  };  
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, imgNumber) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        [`img${imgNumber}`]: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
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
          id_usuario: 1,
          fecha_limite: fecha,
        },
      };
      //axios.request(options);
      let modifiedHtml = htmlPlantilla.html.replace(/{{idea_formulario}}/g, formData.idea);
      modifiedHtml = modifiedHtml.replace(/{{remitente}}/g, formData.remitente);
      modifiedHtml = modifiedHtml.replace(/{{descripcion_formulario}}/g, formData.descripcion);
      modifiedHtml = modifiedHtml.replace(/{{objetivo_formulario}}/g, formData.objetivo);
      modifiedHtml = modifiedHtml.replace(/{{publico_formulario}}/g, formData.publico);
      modifiedHtml = modifiedHtml.replace(/{{tono_formulario}}/g, formData.tono);

      const attachments = []
      for(let i = 1; i <= 4; i++){
        console.log(formData[`img${i}`].data)
        if(formData[`img${i}`]){
          attachments.push({
            filename: formData[`img${i}`].name,
            path: formData[`img${i}`].data,
            cid: 'imgBase'+i+".info",
          })
          // console.log(attachments[i-1])
        }
      }
      options = {
        method: 'POST',
        url: 'http://localhost:8000/formularios/enviarCorreo',
        data: {
          from: formData.remitente,
          to: 'dan29reyes@gmail.com',
          subject: formData.idea,
          text: "",
          html: modifiedHtml,
          attachments: attachments,
        }
      }
      // axios.request(options).then(function (response) {
      //   console.log(response.data);
      // }).catch(function (error) {
      //   console.error(error);
      // });
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
                <div className="image-container-row">
                    <div className="image-container-column">
                        <div
                        className="image-drag-area"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 1)}
                        >
                            <input
                            type="file"
                            name="img1"
                            id="img1"
                            onChange={(e) => handleFileChange(e, 1)}
                            style={{ display: "none" }}
                            ref={fileInputRef1}
                            />
                            {formData[`img1`] ? (
                            <div>
                                <img
                                className="image-icon"
                                src={formData[`img1`].preview}
                                alt="Uploaded Image"
                                />
                                <p>{formData['img1'].preview}</p>
                            </div>
                            ) : (
                            <div className="image-icon" onClick={() => handleIconClick(fileInputRef1)}>
                                <img src={uploadIcon} alt="Upload Icon" />
                                <p className="image-text">Inserte recursos de ayuda</p>
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="image-container-column">
                        <div
                        className="image-drag-area"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 2)}
                        >
                            <input
                            type="file"
                            name="img2"
                            id="img2"
                            onChange={(e) => handleFileChange(e, 2)}
                            style={{ display: "none" }}
                            ref={fileInputRef2}
                            />
                            {formData[`img2`] ? (
                            <div>
                                <img
                                className="image-icon"
                                src={formData[`img2`].preview}
                                alt="Uploaded Image"
                                />
                            </div>
                            ) : (
                            <div className="image-icon" onClick={() => handleIconClick(fileInputRef2)}>
                                <img src={uploadIcon} alt="Upload Icon" />
                                <p className="image-text">Inserte recursos de ayuda</p>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="image-container-row">
                    <div className="image-container-column">
                        <div
                        className="image-drag-area"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 3)}
                        >
                            <input
                                type="file"
                                name="img3"
                                id="img3"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 3)}
                                style={{ display: "none" }}
                                ref={fileInputRef3}
                            />
                            {formData[`img3`] ? (
                            <div>
                              <img
                                className="image-icon"
                                src={formData[`img3`].preview}
                                alt="Uploaded Image"
                              />
                              <p>{formData[`img3`].preview}</p>
                            </div>
                          ) : (
                            <div className="image-icon" onClick={() => handleIconClick(fileInputRef3)}>
                              <img src={uploadIcon} alt="Upload Icon" />
                              <p className="image-text">Inserte recursos de ayuda</p>
                            </div>
                          )}
                        </div>
                    </div>
                    <div className="image-container-column">
                        <div
                        className="image-drag-area"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 4)}
                        >
                            <input
                            type="file"
                            name="img4"
                            id="img4"
                            onChange={(e) => handleFileChange(e, 4)}
                            style={{ display: "none" }}
                            ref={fileInputRef4}
                            />
                            {formData[`img4`] ? (
                            <div>
                                <img
                                className="image-icon"
                                src={formData[`img4`]}
                                alt="Uploaded Image"
                                />
                            </div>
                            ) : (
                            <div className="image-icon" onClick={() => handleIconClick(fileInputRef4)}>
                                <img src={uploadIcon} alt="Upload Icon" />
                                <p className="image-text">Inserte recursos de ayuda</p>
                            </div>
                            )}
                        </div>
                    </div>
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