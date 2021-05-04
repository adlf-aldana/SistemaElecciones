import React, { Fragment, useState, useEffect } from "react";
import BarGraphics from "../GraphicsBar/BarGraphics";
import Tabla from "../Tabla/Tabla";
import { datosFrente, getUniversitarios, porcentajes } from "./Peticiones";
import { dataGraphics } from "./BarGraphics";

const Informe = () => {
  const [datosGraficos, setDatosGraficos] = useState(0);
  const [cantEstudiantes, setcantEstudiantes] = useState(0);
  const [frentes, setFrentes] = useState({});
  const [datosPorcentajes, setDatosPorcentajes] = useState(0);

  const getCantUniversitarios = async () => {
    setcantEstudiantes(await getUniversitarios());
  };

  const getFrente = async () => {
    setFrentes(await datosFrente());
  };

  const graficando = async () => {
    setDatosGraficos(await dataGraphics());
  };

  const porcentajeVotos = async () => {
    setDatosPorcentajes(await porcentajes());
  };
  useEffect(() => {
    getCantUniversitarios();
    getFrente();
    graficando();
    return () => {};
  }, []);
  useEffect(() => {
    porcentajeVotos();
  }, [frentes]);

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center p-4">INFORME</h1>
        {Object.keys(frentes).length > 0 ? (
          <div>
            <p>
              <strong>Total Estudiantes: </strong>
              {cantEstudiantes}
            </p>
            <p>
              <strong>Total que votaron: </strong>
            </p>
            <p>
              <strong>Total que NO votaron: </strong>
            </p>
            <Tabla frentes={frentes} datosPorcentajes={datosPorcentajes} />
            <BarGraphics datosGraficos={datosGraficos} />
          </div>
        ) : (
          <p>No hay datos</p>
        )}
      </div>
    </Fragment>
  );
};

export default Informe;
