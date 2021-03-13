import React, { Fragment, useEffect } from "react";

const ListaUniversitarios = ({
  eliminarEstudiante,
  estudiantes,
  getEstudiantes,
}) => {

  useEffect(() => {
    getEstudiantes();
  }, [getEstudiantes]);

  return (
    <Fragment>
      <h3 className="text-center">Lista de Estudiantes</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((e, index) => (
            <tr key={e._id}>
              <td>{index + 1}</td>
              <td>{e.nombre}</td>
              <td>{e.apellidos}</td>
              <td>
                <button type="button" className="btn btn-warning">
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger ml-2"
                  onClick={() => eliminarEstudiante(e._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListaUniversitarios;
