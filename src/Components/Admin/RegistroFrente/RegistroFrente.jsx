import React, { Fragment } from "react";

const RegistroFrente = () => {
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
    </Fragment>
  );
};

export default RegistroFrente;
