import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const ListaUniversitarios = ({ estudiantes, eliminarEstudiante }) => {

  const [universitarios, setuniversitarios] = useState([]);

  useEffect(() => {
    async function obtData() {
      const res = await axios.get(
        "http://localhost:4000/api/lista_estudiantes"
      );
      setuniversitarios(res.data);
    }

    obtData();
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
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {universitarios.map((e, index) => (
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
                  onClick={() => eliminarEstudiante(e.nombre)}
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
