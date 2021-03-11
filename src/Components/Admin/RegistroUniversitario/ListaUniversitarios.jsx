import React, { Fragment } from "react";

const ListaUniversitarios = ({ estudiantes, eliminarEstudiante }) => {

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
            <tr key={index}>
              <td>{index}</td>
              <td>{e.nombre}</td>
              <td>{e.apellido}</td>
              <td>
                <button type="button" className="btn btn-warning">
                  Editar
                </button>
                <button type="button" className="btn btn-danger ml-2" onClick={()=>eliminarEstudiante(e.nombre)}>
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
