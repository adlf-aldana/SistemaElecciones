import React, { Fragment, useEffect } from "react";

const ListaFrente = ({ getFrente, frentes, eliminar, editar }) => {
  useEffect(() => {
    getFrente();
  }, []);
  return (
    <Fragment>
      <div className="container mt-3">
        <h1 className="text-center">Lista de Frentes</h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Frente</th>
              <th>Nombre Encargado</th>
              <th>Apellidos Encargado</th>
              <th>C.U. Encargado</th>
              <th>Celular Encargado</th>
              <th>Logo Frente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {frentes.map((frente, index) => (
              <tr key={frente._id}>
                <td>{index + 1}</td>
                <td>{frente.nombreFrente}</td>
                <td>{frente.nombreEncargado}</td>
                <td>{frente.apellidosEncargado}</td>
                <td>{frente.cuEncargado}</td>
                <td>{frente.celularEncargado}</td>
                <td>
                  <img
                    src={`http://localhost:4000${frente.logoFrente}`}
                    alt=""
                    width="80"
                    height="100"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => editar(frente)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminar(frente._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListaFrente;
