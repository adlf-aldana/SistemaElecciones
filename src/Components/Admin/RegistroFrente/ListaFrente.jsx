import React, { Fragment } from "react";

const ListaFrente = ({ frentes, eliminar, editar }) => {
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {frentes.map((frente, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{frente.nombreFrente}</td>
                <td>{frente.nombreEncargado}</td>
                <td>{frente.apellidosEncargado}</td>
                <td>{frente.cuEncargado}</td>
                <td>{frente.celularEncargado}</td>
                <td>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => editar(frente)}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListaFrente;
