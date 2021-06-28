import React, { Fragment } from "react";
import { Pie } from "react-chartjs-2";

const BarraGraphics = ({ datosGraficos }) => {
  return (
    <Fragment>
      <h3 className="text-center mt-5">Gráfica de Torta</h3>
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

export default BarraGraphics;
