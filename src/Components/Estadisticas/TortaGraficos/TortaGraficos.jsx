import React, { Fragment } from "react";
import { Bar } from "react-chartjs-2";

const BarGraphics = ({ datosGraficos }) => {
  // console.log(datosGraficos);
  return (
    <Fragment>
      <h3 className="text-center">Barra de Gráficos</h3>
      <Bar
        data={() => datosGraficos}
        redraw
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  max: 100,
                  min: 0,
                  // stepSize: 3,
                },
              },
            ],
          },
        }}
      />
    </Fragment>
  );
};

export default BarGraphics;
