import React, { useContext, useEffect, useState } from "react";
import usuarioAxios from "../../../config/axios";
import FrentesContext from "../../../context/frentes/FrentesContext";

import ListarMesas from "../../Admin/GestionMesas/ListarMesas";
import * as crypto from "crypto-js";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const GestionarMesas = () => {
  const frentesContext = useContext(FrentesContext);
  const { busquedaUniversitario, estudiante } = frentesContext;

  const [datosForm, setdatosForm] = useState([
    {
      id: "",
      mesa: "",
      cargo: "",
      cuEncargado: null,
      celularEncargado: null,
      habilitado: false,
    },
  ]);
  const [datoEncargadoMesa, setdatoEncargadoMesa] = useState({
    cargoEncargadoMesa: "Encargado de Mesa",
    cuEncargadoMesa: null,
    celularEncargadoMesa: null,
    passwordEncargadoMesa: "",
  });
  const [datoVerificadorMesa, setdatoVerificadorMesa] = useState({
    cargoVerificador: "Verificador de Votante",
    cuVerificadorMesa: null,
    celularVerificadorMesa: null,
    passwordVerificadorMesa: "",
  });
  const [actualizarLista, setactualizarLista] = useState(false);
  const [editMesa, seteditMesa] = useState([]);
  const [alerta, setalerta] = useState();
  const [mesas, setMesas] = useState();
  const [ultimoProcesoElectoral, setultimoProcesoElectoral] = useState([]);
  const [datosEstudiante, setdatosEstudiante] = useState([]);

  const handleChange = (index, event) => {
    const values = [...datosForm];
    values[index][event.target.name] = event.target.value;
    setdatosForm(values);
  };
  const handleChangeEncargadoMesa = (e) => {
    setdatoEncargadoMesa({
      ...datoEncargadoMesa,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeVerificadorMesa = (e) => {
    setdatoVerificadorMesa({
      ...datoVerificadorMesa,
      [e.target.name]: e.target.value,
    });
  };

  const verificarEncargado = async (cu) => {
    await busquedaUniversitario(cu);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editMesa.length > 0) {
      //EDITANDO
      // VALIDANDO DATOS DE ENCARGADO DE MESA
      if (
        datoEncargadoMesa.cargo === "" ||
        datoEncargadoMesa.cuEncargado === "" ||
        datoEncargadoMesa.celularEncargado === ""
      ) {
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "danger",
          msg: "Error: Todos los campos deben estar llenos",
        });
        return;
      }
      // VALIDANDO DATOS DE VERIFICADOR DE VOTANTE
      if (
        datoVerificadorMesa.cargo === "" ||
        datoVerificadorMesa.cuEncargado === "" ||
        datoVerificadorMesa.celularEncargado === ""
      ) {
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "danger",
          msg: "Error: Todos los campos deben estar llenos",
        });
        return;
      }
      // VALIDANDO NUMERO DE MESA
      if (datosForm) {
        if (datosForm[0].mesa === "" || datosForm[0].mesa === null) {
          setTimeout(() => {
            setalerta({});
          }, 3000);
          setalerta({
            categoria: "danger",
            msg: "Error: Todos los campos deben estar llenos",
          });
          return;
        }
      }
      // VALIDANDO OTROS CAMPOS DE DATOS DE OTRAS PERSONAS
      let j = 0;
      for (let i = 0; i < datosForm.length; i++) {
        // datosForm.map((form) => {
        if (
          datosForm[i].cargo === "" ||
          datosForm[i].cuEncargado === "" ||
          datosForm[i].celularEncargado === ""
        ) {
          setTimeout(() => {
            setalerta({});
          }, 3000);
          setalerta({
            categoria: "danger",
            msg: "Error: Todos los campos deben estar llenos",
          });
          return;
        }
        // if (datosForm[i].password !== null && j > 1) {
        //   setTimeout(() => {
        //     setalerta({});
        //   }, 3000);
        //   setalerta({
        //     categoria: "danger",
        //     msg: "Error: Solo dos encargados pueden tener password",
        //   });
        //   return;
        // }
        // if (datosForm.password !== "") {
        //   j++;
        // }
      }

      try {
        let datos = [];
        datosForm.map((form) => {
          datos.push({
            id: form.id,
            mesa: datosForm[0].mesa,
            cargo: form.cargo,
            cuEncargado: form.cuEncargado,
            celularEncargado: form.celularEncargado,
            habilitado: false,
            registro: ultimoProcesoElectoral[0].registro,
            cargoEncargadoMesa: datoEncargadoMesa.cargoEncargadoMesa,
            cuEncargadoMesa: datoEncargadoMesa.cuEncargadoMesa,
            celularEncargadoMesa: datoEncargadoMesa.celularEncargadoMesa,
            cargoVerificador: datoVerificadorMesa.cargoVerificador,
            cuVerificador: datoVerificadorMesa.cuVerificadorMesa,
            celularVerificador: datoVerificadorMesa.celularVerificadorMesa,
          });
        });
        await usuarioAxios.put(
          `/api/lista_estudiantes/${datos[0].cuEncargadoMesa}`,
          {
            cargoLogin: datos[0].cargoEncargadoMesa,
          }
        );
        await usuarioAxios.put(
          `/api/lista_estudiantes/${datos[0].cuVerificador}`,
          {
            cargoLogin: datos[0].cargoVerificador,
          }
        );
        await usuarioAxios.put(`/api/mesas/0`, datos);

        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "success",
          msg: "Editado Correctamente",
        });
        // PARA ACTUALIZAR LA LISTA DE MESAS EN EL USE EFFECT
        setactualizarLista(!actualizarLista);
        limpiarDatos();
        seteditMesa([]);
      } catch (e) {
        console.log(e.response);
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "danger",
          msg: e.response.data.msg,
        });
      }
    } else {
      // VALIDANDO DATOS DE ENCARGADO DE MESA
      if (
        datoEncargadoMesa.cargo === "" ||
        datoEncargadoMesa.cuEncargado === "" ||
        datoEncargadoMesa.celularEncargado === "" ||
        datoEncargadoMesa.passwordEncargadoMesa === ""
      ) {
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "danger",
          msg: "Error: Todos los campos deben estar llenos",
        });
        return;
      }
      // VALIDANDO DATOS DE VERIFICADOR DE VOTANTE
      if (
        datoVerificadorMesa.cargo === "" ||
        datoVerificadorMesa.cuEncargado === "" ||
        datoVerificadorMesa.celularEncargado === "" ||
        datoVerificadorMesa.passwordEncargadoMesa === ""
      ) {
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "danger",
          msg: "Error: Todos los campos deben estar llenos",
        });
        return;
      }
      // VALIDANDO NUMERO DE MESA
      if (datosForm) {
        if (datosForm[0].mesa === "" || datosForm[0].mesa === null) {
          setTimeout(() => {
            setalerta({});
          }, 3000);
          setalerta({
            categoria: "danger",
            msg: "Error: Todos los campos deben estar llenos",
          });
          return;
        }
      }
      // VALIDANDO OTROS CAMPOS DE DATOS DE OTRAS PERSONAS
      let j = 0;
      for (let i = 0; i < datosForm.length; i++) {
        // datosForm.map((form) => {
        if (
          datosForm[i].cargo === "" ||
          datosForm[i].cuEncargado === "" ||
          datosForm[i].celularEncargado === ""
        ) {
          setTimeout(() => {
            setalerta({});
          }, 3000);
          setalerta({
            categoria: "danger",
            msg: "Error: Todos los campos deben estar llenos",
          });
          return;
        }
        if (datosForm[i].password !== null && j > 1) {
          setTimeout(() => {
            setalerta({});
          }, 3000);
          setalerta({
            categoria: "danger",
            msg: "Error: Solo dos encargados pueden tener password",
          });
          return;
        }
        if (datosForm.password !== "") {
          j++;
        }
      }
      try {
        let datos = [];
        datosForm.map((form) => {
          datos.push({
            mesa: datosForm[0].mesa,
            cargo: form.cargo,
            cuEncargado: form.cuEncargado,
            celularEncargado: form.celularEncargado,
            habilitado: false,
            registro: ultimoProcesoElectoral[0].registro,
            cargoEncargadoMesa: datoEncargadoMesa.cargoEncargadoMesa,
            cuEncargadoMesa: datoEncargadoMesa.cuEncargadoMesa,
            celularEncargadoMesa: datoEncargadoMesa.celularEncargadoMesa,
            passwordEncargadoMesa: datoEncargadoMesa.passwordEncargadoMesa,
            cargoVerificador: datoVerificadorMesa.cargoVerificador,
            cuVerificador: datoVerificadorMesa.cuVerificadorMesa,
            celularVerificador: datoVerificadorMesa.celularVerificadorMesa,
            passwordVerificador: datoVerificadorMesa.passwordVerificadorMesa,
          });
        });
        await usuarioAxios.put(
          `/api/lista_estudiantes/${datos[0].cuEncargadoMesa}`,
          {
            cargoLogin: datos[0].cargoEncargadoMesa,
          }
        );
        await usuarioAxios.put(
          `/api/lista_estudiantes/${datos[0].cuVerificador}`,
          {
            cargoLogin: datos[0].cargoVerificador,
          }
        );
        // GUARDANDO CONTRASE??A EN UNIVERSITARIOS
        await usuarioAxios.post("/api/mesas/", datos);
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "success",
          msg: "Guardado Correctamente",
        });
        // PARA ACTUALIZAR LA LISTA DE MESAS EN EL USE EFFECT
        setactualizarLista(!actualizarLista);
        limpiarDatos();
      } catch (e) {
        console.log(e.response);
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "danger",
          msg: e.response.data.msg,
        });
      }
    }
  };

  const limpiarDatos = () => {
    setdatosForm([
      {
        mesa: "",
        cargo: "",
        cuEncargado: "",
        celularEncargado: "",
        habilitado: false,
        password: "",
      },
    ]);

    setdatoEncargadoMesa({
      cargoEncargadoMesa: "Encargado de Mesa",
      cuEncargadoMesa: "",
      celularEncargadoMesa: "",
      passwordEncargadoMesa: "",
    });

    setdatoVerificadorMesa({
      cargoVerificador: "Encargado de Mesa",
      cuVerificadorMesa: "",
      celularVerificadorMesa: "",
      passwordVerificadorMesa: "",
    });
  };

  const agregarInput = () => {
    setdatosForm([
      ...datosForm,
      {
        mesa: null,
        cargo: "",
        cuEncargado: null,
        celularEncargado: null,
        habilitado: null,
        password: null,
      },
    ]);
  };

  const cleanForm = () => {
    limpiarDatos();
  };

  const eliminar = async (ids) => {
    if (window.confirm("??Esta seguro de eliminar?")) {
      try {
        ids.map(async (id) => {
          await usuarioAxios.delete(`/api/mesas/${id}`);
        });
        setalerta({
          categoria: "success",
          msg: "Correctamente: Eliminado correctamente",
        });
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const listaMesasPDF = () => {
    try {
      let datosPDF = [];
      // Todos los estudiantes de todas las mesas
      datosEstudiante.map((res) => {
        // Por cantidad de mesas
        for (let i = 0; i < mesas.length; i++) {
          // Por cada mesa
          for (let j = 0; j < mesas[i].cargo.length; j++) {
            if (
              res.cu ===
              crypto.AES.decrypt(
                mesas[i].cuEncargado[j],
                "palabraClave"
              ).toString(crypto.enc.Utf8)
            ) {
              datosPDF.push({
                mesa: mesas[i]._id,
                nombre: res.nombre,
                apellidos: res.apellidos,
                cu: res.cu,
                cargo: mesas[i].cargo[j],
                celular: crypto.AES.decrypt(
                  mesas[i].celularEncargado[j],
                  "palabraClave"
                ).toString(crypto.enc.Utf8),
              });
            }

            if (res.cu === mesas[i].cuEncargadoMesa[j] && j < 1) {
              datosPDF.push({
                mesa: mesas[i]._id,
                nombre: res.nombre,
                apellidos: res.apellidos,
                cu: res.cu,
                cargo: mesas[i].cargoEncargadoMesa[j],
                celular: mesas[i].celularEncargadoMesa[j],
              });
            }

            if (res.cu === mesas[i].cuVerificador[j] && j < 1) {
              datosPDF.push({
                mesa: mesas[i]._id,
                nombre: res.nombre,
                apellidos: res.apellidos,
                cu: res.cu,
                cargo: mesas[i].cargoVerificador[j],
                celular: mesas[i].celularVerificador[j],
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

      doc.text("LISTA DE MESAS", widthPage / 2, 10);

      doc.autoTable({
        startY: 25,
        head: [
          [
            { content: "N?? Mesa" },
            { content: "Nombre" },
            { content: "Apellidos" },
            { content: "Cargo" },
            { content: "Celular" },
            { content: "C.U." },
          ],
        ],
      });

      mesas.map((mesa) => {
        console.log(mesa.cargo.length);
        for (let i = 0; i < mesa.cargo.length; i++) {}
      });

      datosPDF.map((mesa) => {
        doc.autoTable({
          columnStyles: {
            0: { cellWidth: 45 },
            1: { cellWidth: 47 },
            2: { cellWidth: 50 },
            3: { cellWidth: 40 },
            4: { cellWidth: 40 },
            5: { cellWidth: 40 },
          },
          body: [
            [
              mesa.mesa,
              mesa.nombre,
              mesa.apellidos,
              mesa.cargo,
              mesa.celular,
              mesa.cu,
            ],
          ],
        });
      });
      doc.save("listaMesas.pdf");
    } catch (error) {
      console.log(error);
      alerta({
        msg: "Aun no hay estudiantes registrados",
        categoria: "danger",
      });
    }
  };

  // BUSCANDO SI HAY UN PROCESO ELECTORAL
  useEffect(() => {
    try {
      const ultimoProcesoEleccionario = () => {
        usuarioAxios.get("/api/procesoElectoral").then(async (res) => {
          if (res.data.ultimoProcesoElectoral.length > 0) {
            setultimoProcesoElectoral(res.data.ultimoProcesoElectoral);
            const data = await usuarioAxios.get(
              `/api/mesas/${res.data.ultimoProcesoElectoral[0].registro}`
            );
            console.log(data);
            setMesas(data.data.nombreCadaMesaPorRegistro);
          }
        });
      };
      ultimoProcesoEleccionario();
    } catch (e) {
      console.log("Se produjo un error");
    }
  }, [actualizarLista]);

  const obteniendoDatosMesa = async (cu) => {
    usuarioAxios.get(`/api/lista_estudiantes/` + cu).then((res) => {
      return res.data.estudiante;
    });
  };

  const editarMesa = (mesa) => {
    let data = [];
    mesas.map((res) => {
      if (res._id === mesa._id) {
        for (let i = 0; i < res.cargo.length; i++) {
          data.push({
            id: res.id[i],
            cargo: res.cargo[i],
            cargoEncargadoMesa: res.cargoEncargadoMesa[0],
            cargoVerificador: res.cargoVerificador[0],
            celularEncargado: crypto.AES.decrypt(
              res.celularEncargado[i],
              "palabraClave"
            ).toString(crypto.enc.Utf8),
            celularEncargadoMesa: res.celularEncargadoMesa[0],
            celularVerificador: res.celularVerificador[i],
            cuEncargado: crypto.AES.decrypt(
              res.cuEncargado[i],
              "palabraClave"
            ).toString(crypto.enc.Utf8),
            cuEncargadoMesa: res.cuEncargadoMesa[0],
            cuVerificador: res.cuVerificador[i],
            habilitado: res.habilitado[i],
            id: res.id[i],
            mesa: res._id,
          });
        }
      }
    });

    seteditMesa(data);
  };

  useEffect(() => {
    let datos = [];
    if (editMesa.length !== 0) {
      editMesa.map((editar) => {
        if (editar) {
          datos.push(editar);
        }
      });
      setdatosForm(datos);
      // datos.map((dato) => {
      //   console.log(dato);
      //   // setdatosForm({
      //   //   mesa: dato.mesa,
      //   //   cargo: dato.cargo,
      //   //   cuEncargado: dato.cuEncargado,
      //   //   celularEncargado: dato.celularEncargado,
      //   // });
      // });
      setdatoVerificadorMesa({
        cargoVerificador: "Verificador de Votante",
        cuVerificadorMesa: datos[0].cuVerificador,
        celularVerificadorMesa: datos[0].celularVerificador,
      });
      setdatoEncargadoMesa({
        cargoEncargadoMesa: "Encargado de Mesa",
        cuEncargadoMesa: datos[0].cuEncargadoMesa,
        celularEncargadoMesa: datos[0].celularEncargadoMesa,
      });
    }
  }, [editMesa]);

  useEffect(() => {
    var data = [];
    if (mesas !== undefined) {
      if (mesas.length > 0) {
        mesas.map((mesa) => {
          for (let i = 0; i < mesa.cuEncargado.length; i++) {
            if (mesa.cuEncargado) {
              usuarioAxios
                .get(
                  `/api/lista_estudiantes/` +
                    crypto.AES.decrypt(
                      mesa.cuEncargado[i],
                      "palabraClave"
                    ).toString(crypto.enc.Utf8)
                )
                .then((res) => {
                  data.push(res.data.estudiante);
                });
            }
          }
          setdatosEstudiante(data);

          if (mesa.cuEncargadoMesa) {
            usuarioAxios
              .get(`/api/lista_estudiantes/` + mesa.cuEncargadoMesa[0])
              .then((res) => {
                data.push(res.data.estudiante);
              });
          }

          if (mesa.cuVerificador) {
            usuarioAxios
              .get(`/api/lista_estudiantes/` + mesa.cuVerificador[0])
              .then((res) => {
                data.push(res.data.estudiante);
              });
          }
          setdatosEstudiante(data);
        });
      }
    }
  }, [mesas]);

  return (
    <>
      <div className="container mt-3">
        {ultimoProcesoElectoral.length > 0 ? (
          ultimoProcesoElectoral[0].estado ? (
            <>
              <h1 className="text-center">Registro de Mesas</h1>

              {alerta ? (
                <div className={`alert alert-${alerta.categoria}`}>
                  {alerta.msg}
                </div>
              ) : null}

              <button
                className="btn btn-success mr-3"
                onClick={() => listaMesasPDF()}
              >
                Reporte Lista de Mesas
              </button>
              <form onSubmit={onSubmit}>
                <div className="col">
                  <label htmlFor="">N?? de Mesa:</label>
                  <input
                    type="number"
                    name="mesa"
                    placeholder="N?? de Mesa"
                    className="form-control"
                    onChange={(event) => handleChange(0, event)}
                    value={datosForm[0].mesa}
                    // value={datosForm[0] ? datosForm[0].nombreFrente : nombreFrente}
                  />
                </div>

                {/* DATOS ENCARGADO DE MESA */}
                <div className="row mt-3">
                  <div className="col">
                    <h5 htmlFor="">
                      <b>Encargado de Mesa:</b>
                    </h5>
                    <input
                      type="hidden"
                      name="cargoEncargadoMesa"
                      placeholder="Cargo"
                      className="form-control"
                      value="Encargado de Mesa"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="">Carnet Universitario:</label>
                    <input
                      type="number"
                      name="cuEncargadoMesa"
                      placeholder="Carnet Universitario"
                      className="form-control"
                      onChange={(event) => handleChangeEncargadoMesa(event)}
                      value={datoEncargadoMesa.cuEncargadoMesa}
                    />
                    <p>
                      {datoEncargadoMesa.cuEncargadoMesa
                        ? datoEncargadoMesa.cuEncargadoMesa.length
                        : 0}
                      /6
                    </p>
                    <button
                      type="button"
                      className="btn btn-success mt-2"
                      onClick={() =>
                        verificarEncargado(datoEncargadoMesa.cuEncargadoMesa)
                      }
                    >
                      Verificar
                    </button>
                  </div>

                  <div className="col">
                    <label htmlFor="">Celular:</label>
                    <input
                      type="number"
                      name="celularEncargadoMesa"
                      placeholder="Celular"
                      className="form-control"
                      onChange={(event) => handleChangeEncargadoMesa(event)}
                      value={datoEncargadoMesa.celularEncargadoMesa}
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="">Contrase??a:</label>
                    <input
                      type="password"
                      name="passwordEncargadoMesa"
                      placeholder="Agregue una contrase??a"
                      className="form-control"
                      onChange={(event) => handleChangeEncargadoMesa(event)}
                      value={datoEncargadoMesa.passwordEncargadoMesa}
                    />
                  </div>
                </div>

                {/* DATOS VERIFICADOR DE VOTANTE */}
                <div className="row mt-3">
                  <div className="col">
                    <h5 htmlFor="">
                      <b>Verificador de Votante:</b>
                    </h5>
                    <input
                      type="hidden"
                      name="cargoVerificador"
                      placeholder="Cargo"
                      className="form-control"
                      // onChange={(event) => handleChange(1, event)}
                      value="Verificador de Votante"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="">Carnet Universitario:</label>
                    <input
                      type="number"
                      name="cuVerificadorMesa"
                      placeholder="Carnet Universitario"
                      className="form-control"
                      onChange={(event) => handleChangeVerificadorMesa(event)}
                      value={datoVerificadorMesa.cuVerificadorMesa}
                    />
                    {datoVerificadorMesa.cuVerificadorMesa
                      ? datoVerificadorMesa.cuVerificadorMesa.length
                      : 0}
                    /6
                    <button
                      type="button"
                      className="btn btn-success mt-2"
                      onClick={() =>
                        verificarEncargado(
                          datoVerificadorMesa.cuVerificadorMesa
                        )
                      }
                    >
                      Verificar
                    </button>
                  </div>

                  <div className="col">
                    <label htmlFor="">Celular:</label>
                    <input
                      type="number"
                      name="celularVerificadorMesa"
                      placeholder="Celular"
                      className="form-control"
                      onChange={(event) => handleChangeVerificadorMesa(event)}
                      value={datoVerificadorMesa.celularVerificadorMesa}
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="">Contrase??a:</label>
                    <input
                      type="password"
                      name="passwordVerificadorMesa"
                      placeholder="Agregue una contrase??a"
                      className="form-control"
                      onChange={(event) => handleChangeVerificadorMesa(event)}
                      value={datoVerificadorMesa.passwordVerificadorMesa}
                    />
                  </div>
                </div>

                <h3 className="text-center mt-3">DATOS DE OTRAS PERSONAS</h3>
                {/* <p className="text-danger">
                  *Importante: Solo dos encargados pueden contener contrase??a.
                </p> */}

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
                        value={dato.cuEncargado}
                      />
                      <p>{dato.cuEncargado ? dato.cuEncargado.length : 0}/6</p>
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
                        value={dato.celularEncargado}
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

                <div className="row flex-row-reverse">
                  <button
                    className="btn btn-primary m-1"
                    type="button"
                    onClick={cleanForm}
                  >
                    Limpiar
                  </button>
                  {editMesa.length > 0 ? (
                    <button className="btn btn-warning m-1" type="submit">
                      Editar
                    </button>
                  ) : (
                    <button className="btn btn-success m-1" type="submit">
                      Guardar
                    </button>
                  )}
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
              </form>
              <ListarMesas
                actualizarLista={actualizarLista}
                eliminar={eliminar}
                setMesas={setMesas}
                mesas={mesas}
                editarMesa={editarMesa}
                setactualizarLista={setactualizarLista}
              />
            </>
          ) : (
            <h3 className="text-center mt-5">
              Todos los procesos electorales estan cerrados
            </h3>
          )
        ) : (
          <h3 className="text-center mt-5">No ning??n Proceso Electoral</h3>
        )}
      </div>
    </>
  );
};

export default GestionarMesas;
