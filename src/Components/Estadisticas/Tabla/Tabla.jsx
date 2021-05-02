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
            <tr key={dato._id}>
              <td> {index + 1}</td>
              <td>{dato.nombreFrente}</td>
              <td>{dato.cantVotos}</td>
              <td>{((dato.cantVotos * 100) / cantEstudiantes).toFixed(2)} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
