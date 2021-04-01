import axios from "axios";
import React, { Fragment, useState } from "react";
import FileImage from "./fileImg/FileImage";
import ListaFrente from "./ListaFrente";

const RegistroFrente = () => {
  const URL = "http://localhost:4000/api/frente_universitario/";
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

  const [frentes, setfrentes] = useState([]);

  const getFrente = async () => {
    const res = await axios.get(URL, {
      headers: {
        "content-type": "application/json"
      }
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

    const dataimg = new FormData();
    dataimg.append("nombreFrente", nombreFrente);
    dataimg.append("nombreEncargado", nombreEncargado);
    dataimg.append("apellidosEncargado", apellidosEncargado);
    dataimg.append("cuEncargado", cuEncargado);
    dataimg.append("celularEncargado", celularEncargado);
    dataimg.append("logoFrente", logoFrente);

    if (datosForm._id) {
      await axios.put(URL + datosForm._id, datosForm);
    } else {
      await axios.post(URL, dataimg);
    }
    cleanForm();
  };

  const eliminar = async (id) => {
    await axios.delete(URL + id);
    getFrente();
  };

  const editar = (datos) => {
    setdatosForm(datos);
  };

  const cleanForm = () => {
    setdatosForm({
      nombreFrente: "",
      nombreEncargado: "",
      apellidosEncargado: "",
      cuEncargado: "",
      celularEncargado: "",
    });
  };

  return (
    <Fragment>
      <div className="container mt-3">
        <h1 className="text-center">Registro Frente</h1>
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
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label htmlFor="">Carnet Universitario del Encagado:</label>
              <input
                type="text"
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
                type="text"
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
              <FileImage datosForm={datosForm} setdatosForm={setdatosForm} />
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
