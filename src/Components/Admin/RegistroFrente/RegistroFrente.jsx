import React, { Fragment, useContext, useEffect, useState } from "react";
import alertaContext from "../../../context/alerta/alertaContext";
import FrentesContext from "../../../context/frentes/FrentesContext";
import FileImage from "./fileImg/FileImage";
import ListaFrente from "./ListaFrente";
import * as crypto from "crypto-js";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import usuarioAxios from "../../../config/axios";

const RegistroFrente = () => {
  const frentesContext = useContext(FrentesContext);
  const {
    frentes,
    datosFormulario,
    mensaje,
    estudiante,
    nombreLogoUnico,
    frentesPorRegistro,
    obtenerFrentes,
    agregarFrente,
    eliminarFrente,
    limpiarFormulario,
    busquedaUniversitario,
    limpiarMensaje,
  } = frentesContext;

  const alertacontext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertacontext;

  const universitarioContext = useContext(UniversitarioContext);
  const { obteniendoDatosVotante } = universitarioContext;

  const [editUni, seteditUni] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);
  const [datosForm, setdatosForm] = useState([datosFormulario]);
  const [ultimoProcesoElectoral, setultimoProcesoElectoral] = useState([]);

  const [datosFrentes, setdatosFrentes] = useState({});

  const { nombreFrente } = datosForm;

  // const handleChange = ( event) => {
  //   console.log(event.target.value);
  //   // setdatosForm({
  //   //   ...datosForm,
  //   //   [e.target.name]: e.target.value,
  //   // });
  // };

  const handleChange = (index, event) => {
    const values = [...datosForm];
    values[index][event.target.name] = event.target.value;
    setdatosForm(values);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      datosForm[0].nombreFrente.trim() === "" ||
      datosForm[0].logoFrente === ""
    ) {
      mostrarAlerta("Error: Todos los campos deben estar llenos", "danger");
      return;
    }
    // if (
    //   datosForm[0].nombreFrente.length < 1 ||
    //   datosForm[0].cuEncargado.length < 6
    //   // celularEncargado.length < 8
    // ) {
    //   mostrarAlerta(
    //     "Error: Los campos deben ser mayores a 3 caracteres, Carnet Universitario 6 digitos",
    //     "danger"
    //   );
    //   return;
    // }

    // // if (cuEncargado.length > 6 || celularEncargado.length > 8) {
    // if (cuEncargado.length > 6) {
    //   mostrarAlerta(
    //     "Error: Carnet Universitario Solo debe contener 6 dígitos",
    //     "danger"
    //   );
    //   return;
    // }
    const dataimg = new FormData();
    dataimg.append(
      "nombreFrente",
      // crypto.AES.encrypt(datosForm[0].nombreFrente, "palabraClave").toString()
      datosForm[0].nombreFrente
    );
    dataimg.append("logoFrente", datosForm[0].logoFrente);

    datosForm.map((dato) => {
      dataimg.append(
        "cargo",
        dato.cargo
        // crypto.AES.encrypt(datosForm.cargo, "palabraClave").toString()
      );
      dataimg.append(
        "cuEncargado",
        dato.cuEncargado
        // crypto.AES.encrypt(datosForm.cuEncargado, "palabraClave").toString()
      );
      dataimg.append(
        "celularEncargado",
        dato.celularEncargado

        // crypto.AES.encrypt(
        //   datosForm.celularEncargado,
        //   "palabraClave"
        // ).toString()
      );
      dataimg.append(
        "registro",
        ultimoProcesoElectoral[0].registro

        // crypto.AES.encrypt(
        //   datosForm.celularEncargado,
        //   "palabraClave"
        // ).toString()
      );
    });
    console.log(editUni);
    // if (editUni[0]._id) {
    //   console.log(dataimg);
    //   // actualizarFrente(editUni._id, dataimg);
    //   mostrarAlerta("Actualizacion Existosa", "success");
    // } else {
    agregarFrente(dataimg);
    mostrarAlerta("Guardado Existoso", "success");
    // }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Esta seguro de eliminar?")) {
      eliminarFrente(id);
      mostrarAlerta("Eliminado Existoso", "success");
    }
  };

  const editar = (id) => {
    let data = [];

    // frentes[0].map(frente=> console.log(frente.nombreFrente))
    // data.push(
    //   frentes[0].map((frente) => (frente.nombreFrente === id && frente))
    // );

    frentes[0].map((frente) => {
      let res = frente.nombreFrente === id ? data.push(frente) : null;
    });
    // datos = {
    //   _id: datos._id,
    //   nombreFrente: crypto.AES.decrypt(
    //     datos.nombreFrente,
    //     "palabraClave"
    //   ).toString(crypto.enc.Utf8),
    //   cargo: crypto.AES.decrypt(datos.cargo, "palabraClave").toString(
    //     crypto.enc.Utf8
    //   ),
    //   cuEncargado: crypto.AES.decrypt(
    //     datos.cuEncargado,
    //     "palabraClave"
    //   ).toString(crypto.enc.Utf8),
    //   celularEncargado: crypto.AES.decrypt(
    //     datos.celularEncargado,
    //     "palabraClave"
    //   ).toString(crypto.enc.Utf8),
    //   logoFrente: datos.logoFrente,
    // };
    seteditUni(data);
    // //   // setImgPreview("http://192.168.0.6:4000/" + datos.logoFrente);
    // setImgPreview("http://localhost:4000/" + datos.logoFrente);
  };

  const cleanForm = () => {
    limpiarFormulario();
    setImgPreview("");
  };

  const verificarEncargado = async (cu) => {
    await busquedaUniversitario(cu);
  };

  const cargandoDatosFrente = () => {
    const datos = [];
    frentes[0] &&
      frentes[0].map(async frente => datos.push(await obteniendoDatosVotante(frente)));
    setdatosFrentes(datos);
  };

  const listaFrentes = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();

    doc.text("LISTA DE FRENTES", widthPage / 2, 10);
    doc.text(
      `Fecha Proceso Electoral ${frentesPorRegistro[0].registro}`,
      widthPage / 12,
      20
    );
    doc.autoTable({
      startY: 25,
      head: [
        [
          { content: "Nombre Frente" },
          { content: "Cargo" },
          { content: "Nombre" },
          { content: "Apellido" },
          { content: "Celular" },
          { content: "C.U." },
        ],
      ],
    });
    datosFrentes.map((frente) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 65 },
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
          3: { cellWidth: 40 },
          4: { cellWidth: 40 },
        },
        body: [
          [
            frente.nombreFrente,
            frente.cargoFrente,
            frente.nombre,
            frente.apellidos,
            crypto.AES.decrypt(
              frente.celularEncargado,
              "palabraClave"
            ).toString(crypto.enc.Utf8),
            crypto.AES.decrypt(frente.cuEncargado, "palabraClave").toString(
              crypto.enc.Utf8
            ),

            // crypto.AES.decrypt(frente.nombreFrente, "palabraClave").toString(
            //   crypto.enc.Utf8
            // ),
            // frente.nombre,
            // frente.apellidos,
            // crypto.AES.decrypt(frente.cuEncargado, "palabraClave").toString(
            //   crypto.enc.Utf8
            // ),
            // crypto.AES.decrypt(
            //   frente.celularEncargado,
            //   "palabraClave"
            // ).toString(crypto.enc.Utf8),
          ],
        ],
      });
    });
    doc.save("listaFrentes.pdf");
  };

  const agregarInput = () => {
    setdatosForm([
      ...datosForm,
      {
        nombreFrente: "",
        cuEncargado: "",
        celularEncargado: "",
        logoFrente: "",
        cargo: "",
      },
    ]);
  };

  useEffect(() => {
    let datos = [];
    if (editUni.length !== 0) {
      editUni.map((editar) => {
        editar ? datos.push(editar) : console.log("nada");
      });
      setdatosForm(datos);
      setImgPreview("http://localhost:4000/" + datos[0].logoFrente);
      // setdatosForm([
      //   {
      //     nombreFrente: editUni.nombreFrente,
      //     cuEncargado: editUni.cuEncargado,
      //     celularEncargado: editUni.celularEncargado,
      //     logoFrente: editUni.logoFrente,
      //     cantVotos: editUni.cantVotos,
      //     cargo: editUni.cargo,
      //   },
      // ]);
    }
  }, [datosFormulario, editUni]);
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
      limpiarMensaje();
    }
  }, [mensaje]);
  useEffect(() => {
    setdatosForm([
      {
        nombreFrente: "",
        cuEncargado: "",
        celularEncargado: "",
        logoFrente: "",
        cantVotos: "",
        cargo: "",
      },
    ]);
    setImgPreview("");
    seteditUni("");
  }, [datosFormulario]);
  useEffect(() => {
    cargandoDatosFrente();
    // obtenerFrentes();
    const ultimoProcesoEleccionario = () => {
      usuarioAxios.get("/api/procesoElectoral").then((res) => {
        setultimoProcesoElectoral(res.data.ultimoProcesoElectoral);
        obtenerFrentes(res.data.ultimoProcesoElectoral);
      });
    };
    ultimoProcesoEleccionario();
  }, []);

  return (
    <Fragment>
      <div className="container mt-3">
        {ultimoProcesoElectoral.length > 0 ? (
          ultimoProcesoElectoral[0].estado ? (
            <>
              <h1 className="text-center">Registro Frente</h1>

              {alerta ? (
                <div className={`alert alert-${alerta.categoria}`}>
                  {alerta.msg}
                </div>
              ) : null}
              <button
                className="btn btn-success mr-3"
                onClick={() => listaFrentes()}
              >
                Reporte Lista de Frentes
              </button>
              <form onSubmit={onSubmit}>
                <div className="col">
                  <label htmlFor="">Nombre del Frente:</label>
                  <input
                    type="text"
                    name="nombreFrente"
                    placeholder="Nombre del Frente"
                    className="form-control"
                    onChange={(event) => handleChange(0, event)}
                    value={
                      datosForm[0] ? datosForm[0].nombreFrente : nombreFrente
                    }
                    maxLength={30}
                  />
                </div>

                <div className="row mt-3">
                  <div className="col-md-10">
                    <FileImage
                      setImgPreview={setImgPreview}
                      imgPreview={imgPreview}
                      datosForm={datosForm}
                      setdatosForm={setdatosForm}
                    />
                  </div>
                </div>

                {/* <div className="col">
            <label htmlFor="">Carnet Universitario del Encagado:</label>
            <input
              type="number"
              name="cuEncargado"
              placeholder="Carnet Universitario del Encargado"
              className="form-control"
              onChange={handleChange}
              value={cuEncargado}
            />
            <button
              type="button"
              className="btn btn-success mt-2"
              onClick={verificarEncargado}
            >
              Verificar
            </button>
          </div> */}

                <h3 className="text-center">DATOS DE LOS ENCARGADOS</h3>

                {/* <div className="row mt-3">
              <div className="col">
                <label htmlFor="">Cargo:</label>
                <input
                  type="text"
                  name="cargo"
                  placeholder="Cargo"
                  className="form-control"
                  onChange={(event) => handleChange(event)}
                  value={cargo}
                />
              </div>

              <div className="col">
                <label htmlFor="">Carnet Universitario:</label>
                <input
                  type="number"
                  name="cuEncargado"
                  placeholder="Carnet Universitario"
                  className="form-control"
                  onChange={(event) => handleChange(event)}
                  value={cuEncargado}
                />
                <button
                  type="button"
                  className="btn btn-success mt-2"
                  onClick={() => verificarEncargado(cuEncargado)}
                >
                  Verificar
                </button>
              </div>

              <div className="col">
                <label htmlFor="">Celular:</label>
                <input
                  type="number"
                  name="celularEncargado"
                  placeholder="Celular"
                  className="form-control"
                  onChange={(event) => handleChange(event)}
                  value={celularEncargado}
                />
              </div>
            </div> */}
                {/* {datosForm ? <p>{datosForm[0].nombreFrente}</p> : <p>nad</p>} */}

                {datosForm.map((dato, index) => (
                  <div className="row mt-3" key={index}>
                    <div className="col">
                      <label htmlFor="">Cargo:</label>
                      <input
                        type="text"
                        name="cargo"
                        placeholder="Cargo"
                        className="form-control"
                        onChange={(event) => handleChange(index, event)}
                        value={dato.cargo}
                      />
                    </div>

                    <div className="col">
                      <label htmlFor="">Carnet Universitario:</label>
                      <input
                        type="number"
                        name="cuEncargado"
                        placeholder="Carnet Universitario"
                        className="form-control"
                        onChange={(event) => handleChange(index, event)}
                        value={
                          dato.cuEncargado.length > 10
                            ? crypto.AES.decrypt(
                                dato.cuEncargado,
                                "palabraClave"
                              ).toString(crypto.enc.Utf8)
                            : dato.cuEncargado
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-success mt-2"
                        onClick={() => verificarEncargado(dato.cuEncargado)}
                      >
                        Verificar
                      </button>
                    </div>

                    <div className="col">
                      <label htmlFor="">Celular:</label>
                      <input
                        type="number"
                        name="celularEncargado"
                        placeholder="Celular"
                        className="form-control"
                        onChange={(event) => handleChange(index, event)}
                        value={
                          dato.celularEncargado.length > 10
                            ? crypto.AES.decrypt(
                                dato.celularEncargado,
                                "palabraClave"
                              ).toString(crypto.enc.Utf8)
                            : dato.celularEncargado
                        }
                      />
                    </div>
                  </div>
                ))}

                <div class="col mt-3">
                  <button
                    type="button"
                    className="btn btn-success col-12"
                    onClick={agregarInput}
                  >
                    Agregar Encargado
                  </button>
                </div>

                <div className="row mt-3">
                  {estudiante ? (
                    <div className="col">
                      <div className="row">
                        <strong>
                          <label htmlFor="">DATOS ENCARGADO</label>
                        </strong>
                      </div>

                      <div className="row">
                        <strong>
                          <label htmlFor="">Nombre encagado: </label>
                        </strong>
                        <label htmlFor="">{estudiante.nombre}</label>
                      </div>

                      <div className="row">
                        <strong>
                          <label htmlFor="">Apellidos encagado: </label>
                        </strong>
                        <label htmlFor="">{estudiante.apellidos}</label>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="row flex-row-reverse">
                  <button
                    className="btn btn-primary m-1"
                    type="button"
                    onClick={cleanForm}
                  >
                    Limpiar
                  </button>
                  {editUni[0] ? (
                    editUni[0]._id ? (
                      <button className="btn btn-warning m-1" type="submit">
                        Editar
                      </button>
                    ) : null
                  ) : (
                    <button className="btn btn-success m-1" type="submit">
                      Guardar
                    </button>
                  )}
                </div>
              </form>

              {nombreLogoUnico.length > 0 ? (
                <ListaFrente
                  className="mt-5"
                  frentes={nombreLogoUnico}
                  eliminar={eliminar}
                  editar={editar}
                />
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

export default RegistroFrente;
