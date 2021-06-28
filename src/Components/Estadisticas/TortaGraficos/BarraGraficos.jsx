import React, { Fragment } from "react";
import { Bar } from "react-chartjs-2";

const BarGraphics = ({ datosGraficos }) => {
  return (
    <Fragment>
      <h3 className="text-center mt-5">Gráfico de Barras</h3>
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
