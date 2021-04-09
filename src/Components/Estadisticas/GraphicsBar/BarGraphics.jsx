import React, { Fragment, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarGraphics = ({ datos }) => {
  const [Chartdata, setChartdata] = useState({});
  // const { nombreFrente, CantVotos } = datos;

  const chart = () => {
    const nombreFrente = [];
    const CantVotos = [];
    datos.map((dato) => {
      nombreFrente.push(dato.nombreFrente);
      CantVotos.push(dato.CantVotos);
    });

    console.log(nombreFrente);
    setChartdata({
      labels: nombreFrente,
      datasets: [
        {
          label: "# Votos",
          data: CantVotos,
          backgroundColor: ["red", "blue", "orange", "black", "yellow", "pink"],
          // backgroundColor: ["rgba(75,192,192,0.6)"],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
    return () => {};
  }, []);

  return (
    <Fragment>
      <h3>Bar Graphics</h3>
      <Bar data={Chartdata} />
    </Fragment>
  );
};

export default BarGraphics;
