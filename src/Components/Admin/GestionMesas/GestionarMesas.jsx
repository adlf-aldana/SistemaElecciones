import React, { useState } from "react";
import usuarioAxios from "../../../config/axios";

import ListarMesas from "../../Admin/GestionMesas/ListarMesas";

const GestionarMesas = () => {
  const [datosForm, setdatosForm] = useState([
    {
      mesa: null,
      cargo: "",
      cuEncargado: null,
      celularEncargado: null,
      habilitado: null,
    },
  ]);
  const [editMesa, seteditMesa] = useState();
  const [alerta, setalerta] = useState();

  const handleChange = (index, event) => {
    const values = [...datosForm];
    values[index][event.target.name] = event.target.value;
    setdatosForm(values);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (datosForm) {
      if (datosForm[0].mesa === "") {
        setalerta({
          categoria: "danger",
          msg: "Error: Todos los campos deben estar llenos",
        });
      }
    }
    try {
      let datos = []
      datosForm.map(form =>{
        datos.push({
          mesa: datosForm[0].mesa,
          cargo: form.cargo,
          cuEncargado: form.cuEncargado,
          celularEncargado: form.celularEncargado,
          habilitado: false,
        });
      })

      await usuarioAxios.post("/api/mesas", datos);
      setalerta({
        categoria: "success",
        msg: "Correctamente: Guardado Correctamente",
      });
      // limpiarDatos();
    } catch (e) {
      console.log(e.response);
    }
  };

  const limpiarDatos = () => {
    setdatosForm([
      {
        mesa: null,
        cargo: "",
        cuEncargado: null,
        celularEncargado: null,
        habilitado: null,
      },
    ]);
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
      },
    ]);
  };

  const cleanForm = () => {
    console.log("limpiando");
  };

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center">Registro de Mesas</h1>

        {alerta ? (
          <div className={`alert alert-${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}

        {/* <button className="btn btn-success mr-3" onClick={() => listaFrentes()}>
            Reporte Lista de Frentes
          </button> */}
        <form onSubmit={onSubmit}>
          <div className="col">
            <label htmlFor="">N° de Mesa:</label>
            <input
              type="number"
              name="mesa"
              placeholder="N° de Mesa"
              className="form-control"
              onChange={(event) => handleChange(0, event)}
              // value={datosForm[0] ? datosForm[0].nombreFrente : nombreFrente}
            />
          </div>

          <h3 className="text-center">DATOS DE LOS ENCARGADOS</h3>

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
                  //   value={
                  //     dato.cuEncargado.length > 10
                  //       ? crypto.AES.decrypt(
                  //           dato.cuEncargado,
                  //           "palabraClave"
                  //         ).toString(crypto.enc.Utf8)
                  //       : dato.cuEncargado
                  //   }
                />
                <button
                  type="button"
                  className="btn btn-success mt-2"
                  //   onClick={() => verificarEncargado(dato.cuEncargado)}
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
                  //   value={
                  //     dato.celularEncargado.length > 10
                  //       ? crypto.AES.decrypt(
                  //           dato.celularEncargado,
                  //           "palabraClave"
                  //         ).toString(crypto.enc.Utf8)
                  //       : dato.celularEncargado
                  //   }
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

          {/* <div className="row mt-3">
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
          </div> */}

          <div className="row flex-row-reverse">
            <button
              className="btn btn-primary m-1"
              type="button"
              onClick={cleanForm}
            >
              Limpiar
            </button>
            {editMesa ? (
              <button className="btn btn-warning m-1" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-success m-1" type="submit">
                Guardar
              </button>
            )}
          </div>
        </form>
        <ListarMesas />
      </div>
    </>
  );
};

export default GestionarMesas;
