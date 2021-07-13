import React, { Fragment, useEffect } from "react";
import * as crypto from "crypto-js";

const ListaFrente = ({ frentes, eliminar, editar }) => {
  const URL = process.env.REACT_APP_BACKEND_URL;

  // console.log(`${URL}/${frentes[0].logoFrente[0]}`);
  console.log(`${URL}`);
  return (
    <Fragment>
      <div className="container mt-5">
        <h1 className="text-center">Lista de Frentes</h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Frente</th>
              {/* <th>Nombre Encargado</th>
              <th>Apellidos Encargado</th> */}
              {/* <th>C.U. Encargado</th>
              <th>Celular Encargado</th> */}
              <th>Logo Frente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {frentes[0].map((frente, index) => (
              <tr key={frente._id}>
                <td>{index + 1}</td>
                <td>{frente._id}</td>

                {/* <td>{crypto.AES.decrypt(frente.nombreFrente,'palabraClave').toString(crypto.enc.Utf8)}</td> */}
                {/* <td>{crypto.AES.decrypt(frente.cuEncargado,'palabraClave').toString(crypto.enc.Utf8)}</td>
                <td>{crypto.AES.decrypt(frente.celularEncargado,'palabraClave').toString(crypto.enc.Utf8)}</td> */}
                <td>
                  <img
                    // src={`http://localhost:4000${frente.logoFrente}`}
                    src={`${URL}/${frente.logoFrente[0]}`}
                    alt=""
                    width="80"
                    height="100"
                  />
                </td>
                {frente.nombreFrente === "Voto Blanco" ||
                frente.nombreFrente === "Blanco" ? null : (
                  <td>
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => editar(frente._id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminar(frente.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListaFrente;
