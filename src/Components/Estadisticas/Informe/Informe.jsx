import React, { Fragment, useState, useEffect, useContext } from "react";
import BarGraphics from "../TortaGraficos/TortaGraficos";
import Tabla from "../Tabla/Tabla";
import { dataGraphics } from "./BarGraphics";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";
import "jspdf-autotable";
import { PdfMakeWrapper } from "pdfmake-wrapper";
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import * as crypto from 'crypto-js'

import VotanteContext from "../../../context/votante/votanteContext";
import FrenteContext from "../../../context/frentes/FrentesContext";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";

const Informe = () => {
  // Set the fonts to use
  PdfMakeWrapper.setFonts(pdfFonts);
  const votanteContext = useContext(VotanteContext);
  const { obtenerVotantes, cantVotosFrente, votantes } = votanteContext;
  const frenteContext = useContext(FrenteContext);
  const { frentes, obtenerFrentes } = frenteContext;
  const universitarioContext = useContext(UniversitarioContext);
  const {
    estudiantes,
    obtenerUniversitarios,
    estudiantesSinAdmin,
    obteniendoDatosVotante,
  } = universitarioContext;

  const [cantidades, setcantidades] = useState({
    totalUniversitarios: null,
    votaron: null,
    noVotaron: null,
  });

  const [datosFrente, setDatosFrente] = useState([]);
  const [datosVotante, setdatosVotante] = useState([]);

  const informacionCantidadVotos = () => {
    setcantidades({
      totalUniversitarios: estudiantesSinAdmin.length,
      votaron: votantes.length,
      noVotaron: estudiantesSinAdmin.length - votantes.length,
    });
  };

  const obteniendoDatosFrentes = () => {
    obtenerVotantes();
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
  const listaEstudiantes = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();
    const heightPage = doc.internal.pageSize.getHeight();

    doc.text("LISTA DE ESTUDIANTES UNIVERSITARIOS", widthPage / 2, 10);
    doc.autoTable({
      head: [
        [
          { content: "Nombre (s)" },
          { content: "Apellido (s)" },
          { content: "Carrera" },
          { content: "Cargo" },
          { content: "Carnet Universitario" },
        ],
      ],
    });
    estudiantes.map((estudiante) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 48 },
          1: { cellWidth: 52 },
          2: { cellWidth: 36 },
          3: { cellWidth: 40 },
        },
        body: [
          [
            crypto.AES.decrypt(estudiante.nombre,'palabraClave').toString(crypto.enc.Utf8),
            crypto.AES.decrypt(estudiante.apellidos,'palabraClave').toString(crypto.enc.Utf8) ,
            crypto.AES.decrypt(estudiante.carrera,'palabraClave').toString(crypto.enc.Utf8) ,
            crypto.AES.decrypt(estudiante.cargo,'palabraClave').toString(crypto.enc.Utf8),
            crypto.AES.decrypt(estudiante.cu,'palabraClave').toString(crypto.enc.Utf8),
          ],
        ],
      });
    });
    doc.save("listaEstudiantes.pdf");
  };

  const consiguiendoDatosVotante = () => {
    const datos = [];
    votantes.map(async (votante) => {
      datos.push(await obteniendoDatosVotante(votante));
      setdatosVotante(datos);
    });
  };

  const listaVotaciones = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();
    const heightPage = doc.internal.pageSize.getHeight();

    doc.text("LISTA DE VOTACIONES", widthPage / 2, 10);
    doc.autoTable({
      head: [
        [
          { content: "Nombre (s)" },
          { content: "Apellido (s)" },
          { content: "Carrera" },
          { content: "Cargo" },
          { content: "C.U." },
          { content: "Descripción Encargado de Mesa" },
          { content: "Descripción Verificador Votante" },
          { content: "Nombre Frente" },
        ],
      ],
    });
    datosVotante.map((datoEstudiante) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 25 },
          2: { cellWidth: 17 },
          3: { cellWidth: 15 },
          4: { cellWidth: 15 },
          5: { cellWidth: 51 },
          6: { cellWidth: 75 },
          7: { cellWidth: 28 },
        },
        body: [
          [
            datoEstudiante.nombre,
            datoEstudiante.apellidos,
            datoEstudiante.carrera,
            datoEstudiante.cargo,
            datoEstudiante.cu,
            datoEstudiante.descripcionProblemaEncargadoMesa,
            datoEstudiante.descripcionProblemaVerificadorVotante,
            crypto.AES.decrypt(datoEstudiante.nombreFrente,'palabraClave').toString(crypto.enc.Utf8),
          ],
        ],
      });
    });
    doc.save("listaEstudiantes.pdf");
  };
  useEffect(() => {
    obtenerVotantes();
    obtenerFrentes();
    obtenerUniversitarios();
    if (frentes && cantVotosFrente) {
      consiguiendoDatosVotante();
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
        <h1 className="text-center p-4">REPORTE</h1>
        {Object.keys(frentes).length > 0 ? (
          <div>
            <div className="col">
              <div className="row-md-12">
                <button
                  className="btn btn-success mr-3"
                  onClick={() => generarPDF()}
                >
                  Generar Reporte
                </button>
                <button
                  className="btn btn-success mr-3"
                  onClick={() => listaEstudiantes()}
                >
                  Reporte Lista de Estudiantes
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => listaVotaciones()}
                >
                  Reporte Lista De Votaciones
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
