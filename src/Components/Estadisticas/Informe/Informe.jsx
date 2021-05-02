import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import BarGraphics from "../GraphicsBar/BarGraphics";
import Tabla from "../Tabla/Tabla";

const Informe = () => {
  const URL = "http://localhost:4000/api/frente_universitario/";
  const cantEstudiantes = 33;

  const [datos, setdatos] = useState([]);
  const [Chartdata, setChartdata] = useState({});

  const getFrente = async () => {
    const res = await axios.get(URL);
    setdatos(res.data);
    chart(res.data);
  };

  const chart = async (data) => {
    // CONVERSION DE OBJETO A ARRAY
    const nombreFrente = Object.values(data).map((key) => key.nombreFrente);
    const CantVotos = Object.values(data).map((key) => key.cantVotos);
    const porcentajeVotos = CantVotos.map(
      (voto) => ((voto * 100) / cantEstudiantes).toFixed(2)
    );

    // PINTANDO GRAFICO
    setChartdata({
      type: "bar",
      labels: nombreFrente,
      datasets: [
        {
          label: "Elecciones Centro de Estudiantes al 100%",
          data: porcentajeVotos,

          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    getFrente();
    return () => {};
  }, []);
  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center p-4">INFORME</h1>
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
        <Tabla datos={datos} cantEstudiantes={cantEstudiantes} />
        <BarGraphics Chartdata={Chartdata} />
      </div>
    </Fragment>
  );
};

export default Informe;
