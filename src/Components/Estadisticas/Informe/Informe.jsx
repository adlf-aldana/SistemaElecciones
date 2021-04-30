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
    const nombreFrente = Object.values(data).map((key) => key.nombreFrente);
    const CantVotos = Object.values(data).map((key) => key.cantVotos);

    setChartdata({
      labels: nombreFrente,
      datasets: [
        {
          type: "bar",
          label: "votos",
          data: CantVotos,

          backgroundColor: ["red", "blue", "orange", "black", "yellow", "pink"],
          // backgroundColor: ["rgba(75,192,192,0.6)"],
          borderWidth: 4,
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
