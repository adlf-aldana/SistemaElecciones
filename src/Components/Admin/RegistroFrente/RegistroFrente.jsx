import axios from "axios";
import React, { Fragment, useState } from "react";
import FileImage from "./fileImg/FileImage";
import ListaFrente from "./ListaFrente";

const RegistroFrente = () => {
  const [imgPreview, setImgPreview] = useState(null);
  const [frentes, setfrentes] = useState([]);
  const URL = "http://localhost:4000/api/frente_universitario/";
  const [message, setmessage] = useState({
    text: "",
    status: false,
    type: "",
  });

  const [datosForm, setdatosForm] = useState({
    nombreFrente: "",
    nombreEncargado: "",
    apellidosEncargado: "",
    cuEncargado: "",
    celularEncargado: "",
    logoFrente: "",
  });

  const {
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
    logoFrente,
  } = datosForm;

  const getFrente = async () => {
    const res = await axios.get(URL, {
      headers: {
        "content-type": "application/json",
      },
    });
    setfrentes(res.data);
  };

  const handleChange = (e) => {
    setdatosForm({
      ...datosForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      nombreFrente.trim() == "" ||
      nombreEncargado.trim() == "" ||
      apellidosEncargado.trim() == "" ||
      logoFrente == ""
    ) {
      setmessage({
        text: "Error: Todos los campos deben estar llenos",
        status: true,
        type: "danger",
      });

      setTimeout(() => {
        setmessage({
          text: "",
          status: false,
          type: "",
        });
      }, 5000);
      return;
    }

    if (
      nombreFrente.length < 3 ||
      nombreEncargado.length < 3 ||
      apellidosEncargado.length < 3 ||
      cuEncargado.length < 6 ||
      celularEncargado.length < 8
    ) {
      setmessage({
        text:
          "Error: Los campos deben ser mayores a 3 caracteres, Carnet Universitario 6 digitos y celular 8 digitos",
        status: true,
        type: "danger",
      });

      setTimeout(() => {
        setmessage({
          text: "",
          status: false,
          type: "",
        });
      }, 5000);
      return;
    }
    if (
      nombreFrente.length > 30 ||
      nombreEncargado.length > 30 ||
      apellidosEncargado.length > 30 ||
      cuEncargado.length > 6 ||
      celularEncargado.length > 8
    ) {
      setmessage({
        text:
          "Error: Los campos deben ser mayores a 3 caractere, Carnet Universitario 6 digitos y celular 8 digitos",
        status: true,
        type: "danger",
      });

      setTimeout(() => {
        setmessage({
          text: "",
          status: false,
          type: "",
        });
      }, 5000);
      return;
    }
    try {
      const dataimg = new FormData();
      dataimg.append("nombreFrente", nombreFrente);
      dataimg.append("nombreEncargado", nombreEncargado);
      dataimg.append("apellidosEncargado", apellidosEncargado);
      dataimg.append("cuEncargado", cuEncargado);
      dataimg.append("celularEncargado", celularEncargado);
      dataimg.append("logoFrente", logoFrente);
      if (datosForm._id) {
        await axios.put(URL + datosForm._id, dataimg);
      } else {
        await axios.post(URL, dataimg);
      }
    } catch (e) {
      console.log(e);
    }
    cleanForm();
    getFrente();
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Esta seguro de eliminar?")) {
      try {
        await axios.delete(URL + id);
        getFrente();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const editar = (datos) => {
    setdatosForm(datos);
    setImgPreview("http://localhost:4000/" + datos.logoFrente);
  };

  const cleanForm = () => {
    setdatosForm({
      nombreFrente: "",
      nombreEncargado: "",
      apellidosEncargado: "",
      cuEncargado: "",
      celularEncargado: "",
      logoFrente: "",
    });
    setImgPreview("");
  };

  return (
    <Fragment>
      <div className="container mt-3">
        <h1 className="text-center">Registro Frente</h1>
        {message.status ? (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        ) : null}
        <form onSubmit={onSubmit}>
          <div className="row mt-3">
            <div className="col">
              <label htmlFor="">Nombre del Frente:</label>
              <input
                type="text"
                name="nombreFrente"
                placeholder="Nombre del Frente"
                className="form-control"
                onChange={handleChange}
                value={nombreFrente}
                maxLength={30}
              />
            </div>

            <div className="col">
              <label htmlFor="">Nombre del Encargado:</label>
              <input
                type="text"
                name="nombreEncargado"
                placeholder="Nombre del Encargado"
                className="form-control"
                onChange={handleChange}
                value={nombreEncargado}
                maxLength={30}
              />
            </div>

            <div className="col">
              <label htmlFor="">Apellidos del Encargado:</label>
              <input
                type="text"
                name="apellidosEncargado"
                placeholder="Apellidos del Encargado"
                className="form-control"
                onChange={handleChange}
                value={apellidosEncargado}
                maxLength={30}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label htmlFor="">Carnet Universitario del Encagado:</label>
              <input
                type="number"
                name="cuEncargado"
                placeholder="Carnet Universitario del Encargado"
                className="form-control"
                onChange={handleChange}
                value={cuEncargado}
              />
            </div>

            <div className="col">
              <label htmlFor="">Teléfono Celular del Encargado:</label>
              <input
                type="number"
                name="celularEncargado"
                placeholder="Teléfono Celular del Encargado"
                className="form-control"
                onChange={handleChange}
                value={celularEncargado}
              />
            </div>
          </div>

          <div className="row mt-3 text-right">
            <div className="col-md-10">
              <FileImage
                setImgPreview={setImgPreview}
                imgPreview={imgPreview}
                datosForm={datosForm}
                setdatosForm={setdatosForm}
              />
            </div>
            <div className="col-md-1">
              <button className="btn btn-success mr-2" type="submit">
                Guardar
              </button>
            </div>
            <div className="col-md-1">
              <button
                className="btn btn-primary"
                type="button"
                onClick={cleanForm}
              >
                Limpiar
              </button>
            </div>
          </div>
        </form>
      </div>

      <ListaFrente
        getFrente={getFrente}
        frentes={frentes}
        eliminar={eliminar}
        editar={editar}
      />
    </Fragment>
  );
};

export default RegistroFrente;
