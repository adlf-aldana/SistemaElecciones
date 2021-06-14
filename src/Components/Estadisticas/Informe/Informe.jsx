import React, { Fragment, useState, useEffect, useContext } from "react";
import BarGraphics from "../TortaGraficos/TortaGraficos";
import Tabla from "../Tabla/Tabla";
import { dataGraphics } from "./BarGraphics";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";
import "jspdf-autotable";

import VotanteContext from "../../../context/votante/votanteContext";
import FrenteContext from "../../../context/frentes/FrentesContext";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";

const Informe = () => {
  const votanteContext = useContext(VotanteContext);
  const { obtenerVotante, cantVotosFrente, votantes } = votanteContext;
  const frenteContext = useContext(FrenteContext);
  const { frentes, obtenerFrentes } = frenteContext;
  const universitarioContext = useContext(UniversitarioContext);
  const { estudiantes, obtenerUniversitarios } = universitarioContext;

  const [cantidades, setcantidades] = useState({
    totalUniversitarios: null,
    votaron: null,
    noVotaron: null,
  });

  const [datosFrente, setDatosFrente] = useState([]);

  const informacionCantidadVotos = () => {
    setcantidades({
      totalUniversitarios: estudiantes.length,
      votaron: votantes.length,
      noVotaron: estudiantes.length - votantes.length,
    });
  };

  const obteniendoDatosFrentes = () => {
    obtenerVotante();
    obtenerFrentes();
    obtenerUniversitarios();
    if (votantes && estudiantes) {
      informacionCantidadVotos();
    }

    frentes.map((frente) => {
      cantVotosFrente.map((cantidad) => {
        if (frente._id === cantidad._id) {
          setDatosFrente((dato) => [
            ...dato,
            {
              nombreFrente: frente.nombreFrente,
              cantVotos: cantidad.total,
              porcentaje: ((cantidad.total * 100) / estudiantes.length)
                // cantidades.totalUniversitarios
                .toFixed(2),
            },
          ]);
        }
      });
    });
  };
  const [datosGraficos, setDatosGraficos] = useState(0);

  const graficando = () => {
    setDatosGraficos(dataGraphics(datosFrente));
  };
  const generarPDF = () => {
    // const nombres = Object.values(datosFrente).map((key) => [
    //   key.nombreFrente,
    //   key.cantVotos,
    //   key.porcentaje,
    // ]);
    // const cantVotos = Object.values(datosFrente).map((key) => key.cantVotos);
    // const porcentaje = Object.values(datosFrente).map((key) => key.porcentaje);
    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();
    const heightPage = doc.internal.pageSize.getHeight();

    doc.text("INFORME", widthPage / 2, 10);
    doc.text(
      "Total Estudiantes: " +
        cantidades.totalUniversitarios +
        "     Total Votaron: " +
        cantidades.votaron +
        "     Total No Votaron: " +
        cantidades.noVotaron,
      10,
      20
    );
    html2canvas(document.getElementById("grafico")).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      // doc.addImage(img, "JPEG", 10, 25, widthPage - 15, heightPage - 25);
      doc.addImage(img, "JPEG", 15, 25, widthPage - 65, heightPage - 75);
      doc.save("informe.pdf");
    });
  };
  useEffect(() => {
    obtenerVotante();
    obtenerFrentes();
    obtenerUniversitarios();
    if (frentes && cantVotosFrente) {
      obteniendoDatosFrentes();
    }
  }, []);

  useEffect(() => {
    if (votantes && estudiantes) {
      informacionCantidadVotos();
    }
  }, [votantes, estudiantes]);
  useEffect(() => {
    graficando();
  }, [datosFrente]);

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

              {cantidades.totalUniversitarios ? (
                <>
                  <div className="row">
                    <p>
                      <strong>Total Estudiantes: </strong>
                      {cantidades.totalUniversitarios}
                    </p>
                  </div>
                  <div className="row">
                    <p>
                      <strong>Total que votaron: </strong>
                      {cantidades.votaron}
                    </p>
                  </div>
                  <div className="row">
                    <p>
                      <strong>Total que NO votaron: </strong>
                      {cantidades.noVotaron}
                    </p>
                  </div>
                </>
              ) : null}
            </div>
            <div id="tablaDatos"></div>
            <div id="grafico">
              <Tabla datosFrente={datosFrente} />
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
