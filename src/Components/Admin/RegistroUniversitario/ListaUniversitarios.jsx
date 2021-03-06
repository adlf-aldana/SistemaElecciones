import React, { Fragment } from "react";

const ListaUniversitarios = ({
  eliminar,
  estudiantes,
  editarUniversitario,
}) => {
  return (
    <Fragment>
      <h3 className="text-center">Lista de Estudiantes</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">C.U.</th>
            <th scope="col">Carrera</th>
            <th scope="col">Cargo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((e, index) => (
            <tr key={e._id}>
              <td>{index + 1}</td>
              <td>{e.nombre}</td>
              <td>{e.apellidos}</td>
              <td>{e.cu}</td>
              <td>{e.carrera}</td>
              <td>{e.cargo}</td>
              {/* {e.cargo === "Administrador" ? null : ( */}
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editarUniversitario(e)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={() => eliminar(e._id)}
                  >
                    Eliminar
                  </button>
                </td>
              {/* )} */}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListaUniversitarios;
