import React from "react";

const Tabla = ({ datos, cantEstudiantes }) => {
  return (
    <div className="container">
      <h4 className="text-center">TABLA DE DATOS</h4>
      <table className="table text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Frente</th>
            <th>Cantidad de Votos</th>
            <th>Porcentaje de Votos</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato, index) => (
            <tr key={dato.id}>
              <td> {index + 1}</td>
              <td>{dato.nombreFrente}</td>
              <td>{dato.CantVotos}</td>
              <td>{(cantEstudiantes / datos.length) * dato.CantVotos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
