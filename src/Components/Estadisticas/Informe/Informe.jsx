import React, { Fragment, useState, useEffect } from "react";
import BarGraphics from "../GraphicsBar/BarGraphics";
import Tabla from "../Tabla/Tabla";
import { datosFrente, getUniversitarios, porcentajes } from "./Peticiones";
import { dataGraphics } from "./BarGraphics";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";

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
  const generarPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();
    const heightPage = doc.internal.pageSize.getHeight();

    doc.text("INFORME", widthPage / 2, 10);
    doc.text(
      "Total Estudiantes: " +
        cantEstudiantes +
        "     Total Votaron: " +
        0 +
        "     Total No Votaron: " +
        0,
      10,
      20
    );
    // // doc.addPage();
    html2canvas(document.getElementById("capture")).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      doc.addImage(img, "JPEG", 10, 25, widthPage - 15, heightPage - 25);
      doc.save("informe.pdf");
    });
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
            <div className="col">
              <div className="row-md-12">
                <button
                  className="btn btn-success"
                  onClick={() => generarPDF()}
                >
                  Generar PDF
                </button>
              </div>
              <br />
              <p className="row">
                <strong>Total Estudiantes: </strong>
                {cantEstudiantes}
              </p>
              <p className="row">
                <strong>Total que votaron: </strong>
              </p>
              <p className="row">
                <strong>Total que NO votaron: </strong>
              </p>
            </div>
            <div id="capture">
              <Tabla frentes={frentes} datosPorcentajes={datosPorcentajes} />
              <BarGraphics datosGraficos={datosGraficos} />
            </div>
          </div>
        ) : (
          <p>No hay datos</p>
        )}
      </div>
    </Fragment>
  );
};

export default Informe;
