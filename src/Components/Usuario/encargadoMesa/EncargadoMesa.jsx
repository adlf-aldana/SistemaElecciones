import React, { Fragment } from "react";

const EncargadoMesa = () => {
  return (
    <Fragment>
      <div className="container mt-3">
        <h1 className="text-center">Encargado de Mesa</h1>
        <div className="card mt-3">
          <div className="card-header text-center">
            <strong>DATOS DEL ENCARGADO DE MESA</strong>
          </div>
          <div className="card-body">
            <div className="row mt-3">
              <div className="col">
                <strong>Nombre: </strong>
                <label htmlFor="">NOMBRE</label>
              </div>
              <div className="col">
                <strong>Apellidos: </strong>
                <label htmlFor="">APELLIDOS</label>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <strong>Carnet Universitario: </strong>
                <label htmlFor="">C.U. ENCARGADO</label>
              </div>
              <div className="col">
                <strong>Carrera: </strong>
                <label htmlFor="">NAME CARRERA</label>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-2">
            <strong>Habilitar a Votante:</strong>
          </div>
          <div className="col-md-5">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="Introduzca carnet universitario"
            />
          </div>
          <div className="col-md-5">
            <button className="btn btn-success">Buscar</button>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-header text-center">
            <strong>DATOS DEL VOTANTE</strong>
          </div>
          <div className="card-body">
            <div className="row mt-3">
              <div className="col">
                <strong>Nombre: </strong>
                <label htmlFor="">NOMBRE</label>
              </div>

              <div className="col">
                <strong>Apellidos: </strong>
                <label htmlFor="">APELLIDOS</label>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <strong>Carnet Universitario: </strong>
                <label htmlFor="">N° CARNET UNI</label>
              </div>
              <div className="col">
                <strong>Carrera: </strong>
                <label htmlFor="">NAME CARRERA</label>
              </div>
            </div>
            <button className="btn btn-success mt-3">Confirmar</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EncargadoMesa;
