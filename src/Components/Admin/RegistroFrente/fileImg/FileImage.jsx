import React, { Fragment, useState } from "react";
import "./style.css";

const FileImage = ({ datosForm, setdatosForm, setImgPreview, imgPreview }) => {
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
      setdatosForm({ ...datosForm, logoFrente: selected });
    } else {
      setError(true);
    }
  };
  return (
    <Fragment>
      <div className="container">
        {error && <p className="errorMsg">Archivo no soportado</p>}
        <div
          className="imgPreview"
          style={{
            background: imgPreview
              ? `url("${imgPreview}") no-repeat center`
              : "#131313",
          }}
        >
          {!imgPreview && (
            <>
              <p>Agregar Logo</p>
              <label htmlFor="fileUpload" className="customFileUpload">
                Elegir Archivo
              </label>
              <input type="file" id="fileUpload" onChange={handleChange} />
              <span>(jpg, jpeg o png)</span>
            </>
          )}
        </div>
        {imgPreview && (
          <button
            className="buttonCleanImg"
            name="buttonCleanImg"
            id=""
            onClick={() => setImgPreview(null)}
          >
            Eliminar Imagen
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default FileImage;
