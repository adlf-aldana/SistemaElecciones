import React, { Fragment } from "react";
import { Pie } from "react-chartjs-2";

const BarGraphics = ({ datosGraficos }) => {
  // console.log(datosGraficos);
  return (
    <Fragment>
      <h3 className="text-center">Barra de Gráficos</h3>
      <Pie
        data={() => datosGraficos}
        redraw
        // options={{
        //   scales: {
        //     yAxes: [
        //       {
        //         ticks: {
        //           max: 100,
        //           min: 0,
        //           // stepSize: 3,
        //         },
        //       },
        //     ],
        //   },
        // }}
      />
    </Fragment>
  );
};

export default BarGraphics;
