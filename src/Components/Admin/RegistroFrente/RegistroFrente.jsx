import React, { Fragment, useState } from "react";
import ListaFrente from "./ListaFrente";

const RegistroFrente = () => {
  const [frentes, setfrentes] = useState([
    {
      nombreFrente: "Frente 1",
      nombreEncargado: "Nombre 1",
      apellidosEncargado: "Apellidos 1",
      cuEncargado: "123456",
      celularEncargado: "654321",
    },
    {
      nombreFrente: "Frente 2",
      nombreEncargado: "Nombre 2",
      apellidosEncargado: "Apellidos 2",
      cuEncargado: "456789",
      celularEncargado: "987654",
    },
    {
      nombreFrente: "Frente 3",
      nombreEncargado: "Nombre 3",
      apellidosEncargado: "Apellidos 3",
      cuEncargado: "159753",
      celularEncargado: "987321",
    },
  ]);

  return (
    <Fragment>
      <div className="container mt-3">
        <h1 className="text-center">Registro Frente</h1>
        <form>
          <div className="row mt-3">
            <div className="col">
              <label htmlFor="">Nombre del Frente:</label>
              <input
                type="text"
                name="nombreFrente"
                placeholder="Nombre del Frente"
                className="form-control"
              />
            </div>

            <div className="col">
              <label htmlFor="">Nombre del Encargado:</label>
              <input
                type="text"
                name="nombreEncargado"
                placeholder="Nombre del Encargado"
                className="form-control"
              />
            </div>

            <div className="col">
              <label htmlFor="">Apellidos del Encargado:</label>
              <input
                type="text"
                name="apellidosEncargado"
                placeholder="Apellidos del Encargado"
                className="form-control"
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
              />
            </div>

            <div className="col">
              <label htmlFor="">Teléfono Celular del Encargado:</label>
              <input
                type="text"
                name="celularEncargado"
                placeholder="Teléfono Celular del Encargado"
                className="form-control"
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
            <button className="btn btn-primary" type="button">
              Limpiar
            </button>
          </div>
        </form>
      </div>

      <ListaFrente frentes={frentes} />
    </Fragment>
  );
};

export default RegistroFrente;
