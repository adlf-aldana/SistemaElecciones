import React, { useState, useContext, useEffect } from "react";
import usuarioAxios from "../../../config/axios";
import VotanteContext from "../../../context/votante/votanteContext";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";
import FrentesContext from "../../../context/frentes/FrentesContext";
import * as crypto from "crypto-js";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ListarMesas = ({
  actualizarLista,
  eliminar,
  setMesas,
  mesas,
  editarMesa,
  setactualizarLista,
}) => {
  const votanteContext = useContext(VotanteContext);
  const { obtenerVotantes, votantes } = votanteContext;
  const universitarioContext = useContext(UniversitarioContext);
  const { estudiantes, obtenerUniversitarios } = universitarioContext;

  const frentesContext = useContext(FrentesContext);
  const { obtenerFrentes, nombreLogoUnico } = frentesContext;

  const [actualizarListaMesas, setactualizarListaMesas] = useState(false);

  // HABILITA O DESHABILITA UNA MESA PARA VOTAR
  const habilitarMesa = async (habilitado, ids, numMesa) => {
    try {
      ids.map(async (id) => {
        const res = await usuarioAxios.put(`/api/mesas/${id}`, habilitado);
        setMesas(res.data.numMesa);
      });

      if (habilitado[0]) {
        if (window.confirm("¿Esta seguro de cerrar la mesa?")) {
          reporte(numMesa);
        }
      }
      // setactualizarListaMesas(!actualizarLista);
      setactualizarLista(!actualizarLista);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  const reporte = (mesa) => {
    let datosMesa = [];
    // REALIZAMOS UN MAPEO BUSCANDO SOLO LA MESA QUE QUEREMOS EL REPORTE
    mesas.map((res) => {
      // COMPARAMOS LA MESA DEL CUAL QUEREMOS CONSEGUIR EL REPORTE
      if (res._id.toString() === mesa.toString()) {
        // NO PODEMOS HACER UN MAPEO YA QUE ES UN ARRAY ASI
        for (let i = 0; i < res.cuEncargado.length; i++) {
          estudiantes.forEach((estudiante) => {
            // COMPARAMOS LOS DATOS DE ESTUDIANTES DE TODAS LAS MESAS SOLO CON EL DE LA MESA QUE DIMOS CLICK
            if (
              crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
                crypto.enc.Utf8
              ) ===
              crypto.AES.decrypt(res.cuEncargado[i], "palabraClave").toString(
                crypto.enc.Utf8
              )
            ) {
              datosMesa.push({
                mesa: res._id,
                nombre: crypto.AES.decrypt(
                  estudiante.nombre,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                apellidos: crypto.AES.decrypt(
                  estudiante.apellidos,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                cu: crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
                  crypto.enc.Utf8
                ),
                cargo: res.cargo[i],
                celular: res.celularEncargado[i],
              });
            }
            if (
              crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
                crypto.enc.Utf8
              ) === res.cuEncargadoMesa[i].toString() &&
              i < 1
            ) {
              datosMesa.push({
                mesa: res._id,
                nombre: crypto.AES.decrypt(
                  estudiante.nombre,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                apellidos: crypto.AES.decrypt(
                  estudiante.apellidos,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                cu: crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
                  crypto.enc.Utf8
                ),
                cargo: res.cargoEncargadoMesa[i],
                celular: res.celularEncargadoMesa[i],
              });
            }

            if (
              crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
                crypto.enc.Utf8
              ) === res.cuVerificador[i].toString() &&
              i < 1
            ) {
              datosMesa.push({
                mesa: res._id,
                nombre: crypto.AES.decrypt(
                  estudiante.nombre,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                apellidos: crypto.AES.decrypt(
                  estudiante.apellidos,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                cu: crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
                  crypto.enc.Utf8
                ),
                cargo: res.cargoVerificador[i],
                celular: res.celularVerificador[i],
              });
            }
          });
        }
      }
    });

    let datosVotantes = [];

    let idFrente = [];

    votantes.map((votante) => {
      // COMPARAMOS SI EL VOTANTE VOTO EN DICHA MESA
      if (votante.numMesa === mesa.toString()) {
        // for (let i = 0; i < res.cuEncargado.length; i++) {
        idFrente.push(votante._idFrente);
        estudiantes.forEach((estudiante) => {
          // COMPARAMOS LOS DATOS DE ESTUDIANTES DE TODAS LAS MESAS SOLO CON EL DE LA MESA QUE DIMOS CLICK
          if (
            crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
              crypto.enc.Utf8
            ) === votante.cu
          ) {
            if (
              !votante.estadoEncargadoMesa ||
              !votante.estadoVerificadorVotante
            ) {
              datosVotantes.push({
                mesa: votante.numMesa,
                nombre: crypto.AES.decrypt(
                  estudiante.nombre,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                apellidos: crypto.AES.decrypt(
                  estudiante.apellidos,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                cu: crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
                  crypto.enc.Utf8
                ),
                errorEncargadoMesa: votante.descripcionProblemaEncargadoMesa,
                errorVerificador: votante.descripcionProblemaVerificadorVotante,
              });
            } else {
              datosVotantes.push({
                mesa: votante.numMesa,
                nombre: crypto.AES.decrypt(
                  estudiante.nombre,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                apellidos: crypto.AES.decrypt(
                  estudiante.apellidos,
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
                cu: crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
                  crypto.enc.Utf8
                ),
                errorEncargadoMesa: "Sin problemas",
                errorVerificador: "Sin problemas",
              });
            }
          }
        });
        // }
      }
    });

    let cantVotosFrente = [];
    let cant = 0;
    nombreLogoUnico[0].map((nombreCadaFrente) => {

      for (let i = 0; i <= idFrente.length; i++) {
        if (nombreCadaFrente.id[0] === idFrente[i]) {
          cant++;
        }
        if (i === idFrente.length) {
          cantVotosFrente.push({
            nombreFrente: nombreCadaFrente._id,
            cantidadVotos: cant,
          });
        }
      }
      cant = 0;
    });

    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();

    doc.text("CIERRE DE LA MESA " + mesa, widthPage / 2, 10);
    doc.text("ENCARGADOS DE MESA", widthPage / 2, 18);
    doc.autoTable({
      startY: 23,
      head: [
        [
          { content: "Nombre" },
          { content: "Apellidos" },
          { content: "Cargo" },
          { content: "C.U." },
          { content: "Firma" },
        ],
      ],
    });
    datosMesa.map((datos) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 57 },
          1: { cellWidth: 65 },
          2: { cellWidth: 47 },
        },
        body: [[datos.nombre, datos.apellidos, datos.cargo, datos.cu, ""]],
      });
    });

    doc.addPage();
    doc.text("VOTANTES DE LA MESA " + mesa, widthPage / 2, 15);
    doc.autoTable({
      startY: 23,
      head: [
        [
          { content: "Nombre" },
          { content: "Apellidos" },
          { content: "C.U." },
          { content: "Observacion Encargado Mesa" },
          { content: "Observacion Verificador" },
        ],
      ],
    });
    datosVotantes.map((datos) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 29 },
          1: { cellWidth: 20 },
          2: { cellWidth: 13 },
          3: { cellWidth: 27 },
          4: { cellWidth: 92 },
        },
        body: [
          [
            datos.nombre,
            datos.apellidos,
            datos.cargo,
            datos.cu,
            datos.errorEncargadoMesa,
            datos.errorVerificador,
          ],
        ],
      });
    });

    doc.addPage();
    doc.text("TABLA DE RESULTADO DE LA MESA " + mesa, widthPage / 2, 18);
    doc.autoTable({
      startY: 23,
      head: [
        [
          { content: "Nombre Frente" },
          { content: "Cantidad Votos" },
        ],
      ],
    });
    cantVotosFrente.map((datos) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 125 },
        },
        body: [
          [
            datos.nombreFrente,
            datos.cantidadVotos
          ],
        ],
      });
    });

    doc.save(`votos mesa${mesa}.pdf`);
  };

  useEffect(() => {
    obtenerVotantes();
    obtenerUniversitarios();
    const ultimoProcesoEleccionario = () => {
      usuarioAxios.get("/api/procesoElectoral").then((res) => {
        obtenerFrentes(res.data.ultimoProcesoElectoral);
      });
    };
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de Mesas</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>N° de Mesa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas ? (
            mesas.map((mesa, index) => (
              <tr key={mesa._id}>
                <td>{index + 1}</td>
                <td>{mesa._id}</td>
                <td>
                  {mesa.habilitado[0] ? (
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() =>
                        habilitarMesa(mesa.habilitado, mesa.id, mesa._id)
                      }
                    >
                      Cerrar Mesa
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() =>
                        habilitarMesa(mesa.habilitado, mesa.id, mesa._id)
                      }
                    >
                      Abrir Mesa
                    </button>
                  )}

                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => editarMesa(mesa)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => eliminar(mesa.id)}
                  >
                    Eliminar
                  </button>
                  {/* <button
                    type="button"
                    className="btn btn-info mr-2"
                    onClick={() => reporte(mesa._id)}
                  >
                    Reporte
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <p className="text-center">No hay mesas registradas</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListarMesas;
