import React from "react";

const ListaProcesosEleccionarios = ({ ProcesosElectorales }) => {
  const imprimirReporte = (id) => {
    console.log(id);
  };
  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center">Lista de Procesos Eleccionarios Pasados</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Registro</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {ProcesosElectorales.length > 0
              ? ProcesosElectorales.map((proceso) =>
                  !proceso.estado[0] ? (
                    <tr>
                      <td>{proceso._id}</td>
                      <td>
                        <button
                          className="btn btn-warning mr-2"
                          onClick={() => imprimirReporte(proceso.id)}
                        >
                          Reporte
                        </button>
                      </td>
                    </tr>
                  ) : null
                )
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaProcesosEleccionarios;
