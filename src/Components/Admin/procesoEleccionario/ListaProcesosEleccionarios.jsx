import React, { useContext, useState } from "react";

import FrentesContext from "../../../context/frentes/FrentesContext";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";
import VotanteContext from "../../../context/votante/votanteContext";

const ListaProcesosEleccionarios = ({ ProcesosElectorales }) => {
  const frentesContext = useContext(FrentesContext);
  const { frentes, obtenerFrentes } = frentesContext;
  const universitarioContext = useContext(UniversitarioContext);
  const { obtenerUniversitarios, estudiantesPorRegistro,estudiantesSinAdmin, } =
    universitarioContext;

    const votanteContext = useContext(VotanteContext);
  const { obtenerVotantes, cantVotosFrente, votantes } = votanteContext;
  const [ultimoProcesoElectoral, setultimoProcesoElectoral] = useState([]);
  const [cantidades, setcantidades] = useState({
    totalUniversitarios: null,
    votaron: null,
    noVotaron: null,
  });
  const informacionCantidadVotos = () => {
    setcantidades({
      totalUniversitarios: estudiantesSinAdmin.length,
      votaron: votantes.length,
      noVotaron: estudiantesSinAdmin.length - votantes.length,
    });
  };

  const imprimirReporte = (proceso) => {
    // console.log(proceso);
    // const procesoElectoral = {
    //   {ultimoProcesoElectoral[0]: {registro: proceso._id}}
    // }
    obtenerUniversitarios(proceso);
    obtenerFrentes(proceso);
    console.log(frentes);
    console.log(estudiantesPorRegistro);
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
                          onClick={() => imprimirReporte(proceso)}
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
