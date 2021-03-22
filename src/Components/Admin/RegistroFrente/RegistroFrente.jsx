import React, { Fragment, useState } from "react";
import ListaFrente from "./ListaFrente";

const RegistroFrente = () => {
  const [datosForm, setdatosForm] = useState({
    nombreFrente: "",
    nombreEncargado: "",
    apellidosEncargado: "",
    cuEncargado: "",
    celularEncargado: "",
  });

  const {
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
  } = datosForm;

  const [frentes, setfrentes] = useState([
    {
      id: 1,
      nombreFrente: "Frente 1",
      nombreEncargado: "Nombre 1",
      apellidosEncargado: "Apellidos 1",
      cuEncargado: "123456",
      celularEncargado: "654321",
    },
    {
      id: 2,
      nombreFrente: "Frente 2",
      nombreEncargado: "Nombre 2",
      apellidosEncargado: "Apellidos 2",
      cuEncargado: "456789",
      celularEncargado: "987654",
    },
    {
      id: 3,
      nombreFrente: "Frente 3",
      nombreEncargado: "Nombre 3",
      apellidosEncargado: "Apellidos 3",
      cuEncargado: "159753",
      celularEncargado: "987321",
    },
  ]);

  const handleChange = (e) => {
    setdatosForm({
      ...datosForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (datosForm.id) {
      console.log("editando");
    } else {
      setfrentes([...frentes, datosForm]);
    }
    cleanForm();
  };

  const eliminar = (id) => {
    const frente = frentes.filter((item) => item.id !== id);
    setfrentes(frente);
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

            <div className="col">
              <label htmlFor="">Logo del Frente:</label>
              <input type="file" name="" id="" />
              <img src="" width="120px" height="120px" />
            </div>
          </div>

          <div className="col mt-3 text-right">
            <button className="btn btn-success mr-2" type="submit">
              Guardar
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={cleanForm}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>

      <ListaFrente frentes={frentes} eliminar={eliminar} editar={editar} />
    </Fragment>
  );
};

export default RegistroFrente;
