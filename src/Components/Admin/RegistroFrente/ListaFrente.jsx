import React, { Fragment } from "react";

const ListaFrente = ({ frentes, eliminar, editar }) => {
  const URL = process.env.REACT_APP_BACKEND_URL;

  return (
    <Fragment>
      <div className="container mt-5">
        <h1 className="text-center">Lista de Frentes</h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Frente</th>
              <th>Logo Frente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {frentes[0].map((frente, index) => (
              <tr key={frente._id}>
                <td>{index + 1}</td>
                <td>{frente._id}</td>
                <td>
                  <img
                    // src={`http://localhost:4000${frente.logoFrente[index]}`}
                    // src={
                    //   `http://localhost:4000/${frente.logoFrente[0]}`
                    //     ? `http://localhost:4000/${frente.logoFrente[0]}`
                    //     : `${URL}/${frente.logoFrente[0]}`
                    // }

                    // src={`http://localhost:4000/public/images/descarga.png`}
                    // src={require("./descarga.png").default}
                    src={`${URL}/${frente.logoFrente[0]}`}
                    alt="partido politico"
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
