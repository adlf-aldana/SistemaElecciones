import React, { Fragment, useState, useEffect, useContext } from "react";
import BarGraphics from "../GraphicsBar/BarGraphics";
import Tabla from "../Tabla/Tabla";
import { datosFrente, getUniversitarios, porcentajes } from "./Peticiones";
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
    // {
    //   cantVotosFrente.map(cantidad => {
    //     if(frente._id === cantidad._idFrente){
    //       setDatos({
    //         datosFrentes: {
    //           nombreFrente: frente.nombreFrente,
    //           cantVotos: total
    //         }
    //       })
    //     }
    //   })
    // )}
  };
  const [datosGraficos, setDatosGraficos] = useState(0);
  // const [cantEstudiantes, setcantEstudiantes] = useState(0);
  // const [frentes, setFrentes] = useState({});
  // const [datosPorcentajes, setDatosPorcentajes] = useState(0);

  // const getCantUniversitarios = async () => {
  //   setcantEstudiantes(await getUniversitarios());
  // };

  // const getFrente = async () => {
  //   setFrentes(await datosFrente());
  // };

  const graficando = () => {
    setDatosGraficos(dataGraphics(datosFrente));
  };
  const generarPDF = () => {
    const nombres = Object.values(datosFrente).map((key) => [
      key.nombreFrente,
      key.cantVotos,
      key.porcentaje,
    ]);
    const cantVotos = Object.values(datosFrente).map((key) => key.cantVotos);
    const porcentaje = Object.values(datosFrente).map((key) => key.porcentaje);

    console.log(nombres);
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
    // doc.autoTable({ html: "#my-table" });
    // doc.autoTable({
    //   head: [["Frente", "Cantidad de Votos", "Porcentaje de Votos"]],
    //   body: [nombres]
    // });

    // doc.autoTable({
    //   head: [["Frente", "Cantidad de Votos", "Porcentaje de Votos"]],
    // });
    // Object.values(datosFrente).map((frente, index) => {
    //   doc.autoTable({
    //     body: [
    //       [frente.nombreFrente, frente.cantVotos, frente.porcentaje],

    //       // Object.values(datosFrente).map((frente) => {
    //       //   frente
    //       //   // [frente.nombreFrente, frente.cantVotos, frente.porcentaje];
    //       // }),
    //       // datosFrente.map((frente, index) => {
    //       //   [nombres[0], cantVotos[0], porcentaje[0]]
    //       // }),
    //       // datosFrente.map((frente) => {
    //       //   console.log(frente);
    //       //   [frente.nombreFrente, frente.cantVotos, frente.porcentaje]
    //       // }),
    //       // ["1", "Frente 1", "2", "15"],
    //       // ["2", "Frente 2", "3", "30"],
    //     ],
    //   });
    // });

    // doc.autoTable({
    //   head: [["#", "Frente", "Cantidad de Votos", "Porcentaje de Votos"]],
    // });
    // Object.values(datosFrente).map((frente, index) => {
    //   doc.autoTable({
    //     body: [
    //       [index + 1, frente.nombreFrente, frente.cantVotos, frente.porcentaje],
    //       // Object.values(datosFrente).map((frente) => {
    //       //   frente
    //       //   // [frente.nombreFrente, frente.cantVotos, frente.porcentaje];
    //       // }),
    //       // datosFrente.map((frente, index) => {
    //       //   [nombres[0], cantVotos[0], porcentaje[0]]
    //       // }),
    //       // datosFrente.map((frente) => {
    //       //   console.log(frente);
    //       //   [frente.nombreFrente, frente.cantVotos, frente.porcentaje]
    //       // }),
    //       // ["1", "Frente 1", "2", "15"],
    //       // ["2", "Frente 2", "3", "30"],
    //     ],
    //   });
    // });
    // });

    html2canvas(document.getElementById("tablaDatos")).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      doc.addImage(img, "JPEG", 10, 25, widthPage - 15, heightPage - 25);
      
    });
    // doc.addPage();
    // html2canvas(document.getElementById("grafico")).then(function (canvas) {
    //   var img = canvas.toDataURL("image/png");
    //   doc.addImage(img, "JPEG", 10, 25, widthPage - 15, heightPage - 25);
    //   // doc.save("informe.pdf");
    // });
    doc.save("informe.pdf");
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
            <div id="tablaDatos">
              <Tabla datosFrente={datosFrente} />
            </div>
            <div id="grafico">
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
