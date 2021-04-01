import React, { Fragment, useEffect } from "react";
// import { Link } from "react-router-dom";

const ListaUniversitarios = ({
  eliminarEstudiante,
  estudiantes,
  getEstudiantes,
  editarUniversitario,
}) => {

  useEffect(() => {
    getEstudiantes();
  }, []);

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
              <td>
                {/* <Link className="btn btn-warning" to={"/editar/" + e._id}>
                  Edit
                </Link> */}
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
