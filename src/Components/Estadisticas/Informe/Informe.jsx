import React, { Fragment, useState, useEffect, useContext } from "react";
import BarGraphics from "../TortaGraficos/TortaGraficos";
import BarraGraphics from "../TortaGraficos/BarraGraficos";
import Tabla from "../Tabla/Tabla";
import { dataGraphics } from "./BarGraphics";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";
import "jspdf-autotable";
import { PdfMakeWrapper } from "pdfmake-wrapper";
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

import VotanteContext from "../../../context/votante/votanteContext";
import FrenteContext from "../../../context/frentes/FrentesContext";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";
import usuarioAxios from "../../../config/axios";

import * as crypto from "crypto-js";

const Informe = () => {
  // Set the fonts to use
  PdfMakeWrapper.setFonts(pdfFonts);
  const votanteContext = useContext(VotanteContext);
  const { obtenerVotantes, cantVotosFrente, votantes } = votanteContext;
  const frenteContext = useContext(FrenteContext);
  const { frentes, obtenerFrentes, nombreLogoUnico } = frenteContext;
  const universitarioContext = useContext(UniversitarioContext);
  const {
    estudiantes,
    estudiantesPorRegistro,
    obtenerUniversitarios,
    estudiantesSinAdmin,
    obteniendoDatosVotante,
  } = universitarioContext;

  const [cantidades, setcantidades] = useState({
    totalUniversitarios: null,
    votaron: null,
    noVotaron: null,
  });

  const [mesaHabilitada, setmesaHabilitada] = useState(false);
  const [numMesa, setNumMesa] = useState(false);

  const [datosFrente, setDatosFrente] = useState([]);
  const [datosVotante, setdatosVotante] = useState([]);
  const [ultimoProcesoElectoral, setultimoProcesoElectoral] = useState([]);
  const [mesas, setMesas] = useState();

  const informacionCantidadVotos = () => {
    setcantidades({
      totalUniversitarios: estudiantesSinAdmin.length,
      votaron: votantes.length,
      noVotaron: estudiantesSinAdmin.length - votantes.length,
    });
  };

  const obteniendoDatosFrentes = (todosFrentes, resVotante, unis) => {
    try {
      if (votantes && estudiantes) {
        informacionCantidadVotos();
      }
      todosFrentes.data.nombreCadaFrentePorRegistro.map((frente) => {
        resVotante.cantPartido.map((cantidad) => {
          if (frente.id[0] === cantidad._id) {
            console.log(cantidad.total);
            setDatosFrente((dato) => [
              ...dato,
              {
                nombreFrente: frente._id,
                cantVotos: cantidad.total,
                porcentaje: (
                  (cantidad.total * 100) /
                  unis.data.registroUniversitario.length
                ).toFixed(2),
              },
            ]);
          }
        });
      });
    } catch (e) {
      console.log("Se produjo un error");
    }
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
      orientation: "portrait",
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
      doc.addImage(img, "JPEG", 45, 25, widthPage - 80, heightPage - 25);
      doc.save("informe.pdf");
    });
  };

  const consiguiendoDatosVotante = () => {
    const datos = [];
    if (votantes) {
      votantes.map(async (votante) => {
        datos.push(await obteniendoDatosVotante(votante));
        setdatosVotante(datos);
      });
    }
  };

  const reporteVotaronPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();

    doc.text("LISTA DE VOTACIONES", widthPage / 2, 10);
    doc.autoTable({
      head: [
        [
          { content: "Nombre (s)" },
          { content: "Apellido (s)" },
          { content: "Carrera" },
          { content: "Cargo" },
          { content: "C.U." },
        ],
      ],
    });
    datosVotante.map((datoEstudiante) => {
      datoEstudiante.nombreFrente
        ? doc.autoTable({
            columnStyles: {
              0: { cellWidth: 65 },
              1: { cellWidth: 55 },
              2: { cellWidth: 60 },
              3: { cellWidth: 40 },
            },
            body: [
              [
                datoEstudiante.nombre,
                datoEstudiante.apellidos,
                datoEstudiante.carrera,
                datoEstudiante.cargo,
                datoEstudiante.cu,
              ],
            ],
          })
        : doc.autoTable({});
    });

    doc.save("listaVotaciones.pdf");
  };

  const reporteRechazadosPDF = () => {
    const datos = datosVotante.filter(
      (dato) =>
        (dato.nombreFrente !== null || dato.nombreFrente !== undefined) &&
        (dato.descripcionProblemaEncargadoMesa ||
          dato.descripcionProblemaVerificadorVotante)
    );
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        format: "letter",
      });
      const widthPage = doc.internal.pageSize.getWidth();
      doc.text("LISTA DE VOTANTES RECHAZADOS", widthPage / 2, 10);
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
          ],
        ],
      });
      datos.map((datoEstudiante) => {
        doc.autoTable({
          columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 25 },
            2: { cellWidth: 20 },
            3: { cellWidth: 20 },
            4: { cellWidth: 15 },
            5: { cellWidth: 71 },
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
            ],
          ],
        });
      });
      doc.save("listaRechazados.pdf");
    } catch (e) {
      console.log(e);
    }
  };

  const reporteNoVotaronPDf = () => {
    let dato = estudiantes;
    votantes.map((votante) => {
      dato = dato.filter(
        (estudiante) =>
          crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
            crypto.enc.Utf8
          ) !== votante.cu
      );
    });

    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();

    doc.text("LISTA DE NO VOTANTES", widthPage / 2, 10);
    doc.autoTable({
      head: [
        [
          { content: "Nombre (s)" },
          { content: "Apellido (s)" },
          { content: "Carrera" },
          { content: "Cargo" },
          { content: "C.U." },
        ],
      ],
    });
    dato.map((datoEstudiante) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 65 },
          1: { cellWidth: 65 },
          2: { cellWidth: 50 },
          3: { cellWidth: 40 },
        },
        body: [
          [
            crypto.AES.decrypt(datoEstudiante.nombre, "palabraClave").toString(
              crypto.enc.Utf8
            ),
            crypto.AES.decrypt(
              datoEstudiante.apellidos,
              "palabraClave"
            ).toString(crypto.enc.Utf8),
            crypto.AES.decrypt(datoEstudiante.carrera, "palabraClave").toString(
              crypto.enc.Utf8
            ),
            crypto.AES.decrypt(datoEstudiante.cargo, "palabraClave").toString(
              crypto.enc.Utf8
            ),
            crypto.AES.decrypt(datoEstudiante.cu, "palabraClave").toString(
              crypto.enc.Utf8
            ),
          ],
        ],
      });
    });
    doc.save("listaNoVotantes.pdf");
  };

  const reportePorMesasPDF = () => {
    let datosVotanteLinea = [];
    estudiantes.map((estudiante) => {
      for (let i = 0; i < votantes.length; i++) {
        if (
          crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
            crypto.enc.Utf8
          ) === votantes[i].cu
        ) {
          if (votantes[i].numMesa === "00000") {
            datosVotanteLinea.push({
              nombre: crypto.AES.decrypt(
                estudiante.nombre,
                "palabraClave"
              ).toString(crypto.enc.Utf8),
              apellidos: crypto.AES.decrypt(
                estudiante.apellidos,
                "palabraClave"
              ).toString(crypto.enc.Utf8),
              carrera: crypto.AES.decrypt(
                estudiante.carrera,
                "palabraClave"
              ).toString(crypto.enc.Utf8),
              cu: crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
                crypto.enc.Utf8
              ),
            });
          }
        }
      }
    });

    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();

    doc.text("LISTA DE VOTANTES EN LINEA", widthPage / 2, 10);
    doc.autoTable({
      head: [
        [
          { content: "Nombre (s)" },
          { content: "Apellido (s)" },
          { content: "Carrera" },
          { content: "C.U." },
        ],
      ],
    });

    datosVotanteLinea.map((datoEstudiante) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 77 },
          1: { cellWidth: 81 },
          2: { cellWidth: 55 },
        },
        body: [
          [
            datoEstudiante.nombre,
            datoEstudiante.apellidos,
            datoEstudiante.carrera,
            datoEstudiante.cu,
          ],
        ],
      });
    });

    doc.save("VotosEnLinea.pdf");
  };

  useEffect(() => {
    if (votantes && estudiantes) {
      informacionCantidadVotos();
    }
  }, [votantes, estudiantes]);

  useEffect(() => {
    graficando();
  }, [datosFrente]);

  useEffect(() => {
    if (usuario) {
      usuarioAxios.get(`/api/mesas/${usuario.cu}`).then((res) => {
        setmesaHabilitada(res.data.mesaAbierta[0].habilitado);
        setNumMesa(res.data.mesaAbierta[0].mesa);
      });
    }
  }, []);

  useEffect(() => {
    const ultimoProcesoEleccionario = async () => {
      await usuarioAxios.get("/api/procesoElectoral").then(async (res) => {
        if (res.data.ultimoProcesoElectoral.length > 0) {
          setultimoProcesoElectoral(res.data.ultimoProcesoElectoral);

          const data = await usuarioAxios.get(
            `/api/mesas/${res.data.ultimoProcesoElectoral[0].registro}`
          );
          setMesas(data.data.nombreCadaMesaPorRegistro);
        }

        // await setultimoProcesoElectoral(res.data.ultimoProcesoElectoral);
        const todosFrentes = await obtenerFrentes(
          res.data.ultimoProcesoElectoral
        );

        const unis = await obtenerUniversitarios(
          res.data.ultimoProcesoElectoral
        );

        const resVotante = await obtenerVotantes();

        if (todosFrentes.data.registroFrentes && resVotante.cantPartido) {
          consiguiendoDatosVotante();
          console.log(todosFrentes);
          console.log(resVotante);
          console.log(unis);
          obteniendoDatosFrentes(todosFrentes, resVotante, unis);
        }

        await obtenerUniversitarios();
      });
    };

    ultimoProcesoEleccionario();
  }, []);

  return (
    <Fragment>
      <div className="container">
        {ultimoProcesoElectoral.length > 0 ? (
          ultimoProcesoElectoral[0].estado ? (
            <>
              <h1 className="text-center p-4">REPORTE</h1>
              {Object.keys(frentes).length > 0 ? (
                <div>
                  <div className="col">
                    <div className="row-md-12">
                      <button
                        className="btn btn-success mr-2"
                        onClick={() => generarPDF()}
                      >
                        Generar Reporte
                      </button>

                      <button
                        className="btn btn-success mr-2"
                        onClick={() => reporteVotaronPDF()}
                      >
                        Reporte emitieron su voto
                      </button>

                      <button
                        className="btn btn-success mr-2"
                        onClick={() => reporteRechazadosPDF()}
                      >
                        Reporte votantes rechazados
                      </button>

                      <button
                        className="btn btn-success mr-2"
                        onClick={() => reporteNoVotaronPDf()}
                      >
                        Reporte no emitieron su voto
                      </button>

                      <button
                        className="btn btn-success mr-2"
                        onClick={() => reportePorMesasPDF()}
                      >
                        Reporte votantes en linea
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
                    <BarraGraphics datosGraficos={datosGraficos} />
                  </div>
                </div>
              ) : (
                <p>No hay datos</p>
              )}
            </>
          ) : (
            <h3 className="text-center mt-5">
              Todos los procesos electorales estan cerrados
            </h3>
          )
        ) : (
          <h3 className="text-center mt-5">No ningún Proceso Electoral</h3>
        )}
      </div>
    </Fragment>
  );
};

export default Informe;
