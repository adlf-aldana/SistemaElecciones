import React, { Fragment, useState } from "react";
import BarGraphics from "../GraphicsBar/BarGraphics";
import Tabla from "../Tabla/Tabla";

const Informe = () => {
  const cantEstudiantes = 1000;

  const [datos, setdatos] = useState([
    { id: 1, nombreFrente: "Frente 1", CantVotos: 6 },
    { id: 2, nombreFrente: "Frente 2", CantVotos: 10 },
    { id: 3, nombreFrente: "Frente 3", CantVotos: 15 },
    { id: 4, nombreFrente: "Frente 4", CantVotos: 12 },
    { id: 5, nombreFrente: "Frente 5", CantVotos: 3 },
  ]);
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
        <BarGraphics datos={datos} />
      </div>
    </Fragment>
  );
};

export default Informe;
