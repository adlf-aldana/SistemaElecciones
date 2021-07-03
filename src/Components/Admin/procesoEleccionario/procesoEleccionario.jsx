import React, { useState, useEffect } from "react";
import usuarioAxios from "../../../config/axios";
import ListaProcesosEleccionarios from "./ListaProcesosEleccionarios";

const ProcesoEleccionario = () => {
  const [alerta, setalerta] = useState();
  const [ultimoProcesoElectoral, setultimoProcesoElectoral] = useState([]);
  const [ProcesosElectorales, setProcesosElectorales] = useState([]);
  const [actualizarLista, setactualizarLista] = useState(false);
  const [datosForm, setdatosForm] = useState([
    {
      cargo: "",
      nombre: "",
      apellido: "",
      ci: "",
    },
  ]);

  const handleChange = (index, event) => {
    const values = [...datosForm];
    values[index][event.target.name] = event.target.value;
    setdatosForm(values);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Se abrirá un nuevo proceso electoral con la fecha y hora actual, ¿esta seguro de continuar?"
      )
    ) {
      // VALIDANDO
      //   datosForm.map((dato) => {
      //       console.log(Object.values(dato));
      //     // if (Object.keys(dato).length < 3) {
      //     //   setTimeout(() => {
      //     //     setalerta({});
      //     //   }, 3000);
      //     //   setalerta({
      //     //     categoria: "danger",
      //     //     msg: "Error: Todos los campos son obligatorios",
      //     //   });
      //     //   return;
      //     // }
      //   });
      //   console.log(datosForm);
      await usuarioAxios.post("/api/procesoElectoral/", datosForm);
      setactualizarLista(!actualizarLista);
    }
  };

  const cerrarProceso = async (id) => {
    try {
      await usuarioAxios.put(`/api/procesoElectoral/${id}`, false);
      setactualizarLista(!actualizarLista);
    } catch (error) {
      console.log(error.response);
    }
  };

  const agregarInput = () => {
    setdatosForm([
      ...datosForm,
      {
        cargo: "",
        nombre: "",
        apellido: "",
        ci: "",
      },
    ]);
  };

  useEffect(async () => {
    try {
      const res = await usuarioAxios.get("/api/procesoElectoral");
      setultimoProcesoElectoral(res.data.ultimoProcesoElectoral);
      setProcesosElectorales(res.data.procesosElectorales);
    } catch (error) {
      console.log(error.response);
    }
  }, [actualizarLista]);

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center">Proceso Eleccionario</h1>

        {alerta ? (
          <div className={`alert alert-${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}

        {/*<button
            className="btn btn-success mr-3"
            onClick={() => listaFrentes()}
          >
            Reporte Lista de Frentes
          </button> */}

        {ultimoProcesoElectoral.length > 0 ? (
          ultimoProcesoElectoral[0].estado ? (
            <div className="text-center">
              <h4>Se está realizando un proceso electoral</h4>
              <p>Fecha de Apertura: {ultimoProcesoElectoral[0].registro}</p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => cerrarProceso(ultimoProcesoElectoral[0]._id)}
              >
                Cerrar Proceso Electoral
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <h4 className="text-center mt-4">REGISTRO DE LOS PRESENTES</h4>

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
                      // value={dato.cargo}
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="">Nombre:</label>
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Introduzca un Nombre"
                      className="form-control"
                      onChange={(event) => handleChange(index, event)}
                      // value={
                      //   dato.cuEncargado.length > 10
                      //     ? crypto.AES.decrypt(
                      //         dato.cuEncargado,
                      //         "palabraClave"
                      //       ).toString(crypto.enc.Utf8)
                      //     : dato.cuEncargado
                      // }
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="">Apellido:</label>
                    <input
                      type="text"
                      name="apellido"
                      placeholder="Introduzca un apellido"
                      className="form-control"
                      onChange={(event) => handleChange(index, event)}
                      // value={
                      //   dato.celularEncargado.length > 10
                      //     ? crypto.AES.decrypt(
                      //         dato.celularEncargado,
                      //         "palabraClave"
                      //       ).toString(crypto.enc.Utf8)
                      //     : dato.celularEncargado
                      // }
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="">Carnet de Identidad:</label>
                    <input
                      type="number"
                      name="ci"
                      placeholder="Introduzca carnet de identidad"
                      className="form-control"
                      onChange={(event) => handleChange(index, event)}
                      // value={
                      //   dato.celularEncargado.length > 10
                      //     ? crypto.AES.decrypt(
                      //         dato.celularEncargado,
                      //         "palabraClave"
                      //       ).toString(crypto.enc.Utf8)
                      //     : dato.celularEncargado
                      // }
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
                <button className="btn btn-success m-1" type="submit">
                  Abrir Proceso Eleccionario
                </button>
              </div>
            </form>
          )
        ) : (
          <form onSubmit={onSubmit}>
            <h4 className="text-center mt-4">REGISTRO DE LOS PRESENTES</h4>

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
                    // value={dato.cargo}
                  />
                </div>

                <div className="col">
                  <label htmlFor="">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Introduzca un Nombre"
                    className="form-control"
                    onChange={(event) => handleChange(index, event)}
                    // value={
                    //   dato.cuEncargado.length > 10
                    //     ? crypto.AES.decrypt(
                    //         dato.cuEncargado,
                    //         "palabraClave"
                    //       ).toString(crypto.enc.Utf8)
                    //     : dato.cuEncargado
                    // }
                  />
                </div>

                <div className="col">
                  <label htmlFor="">Apellido:</label>
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Introduzca un apellido"
                    className="form-control"
                    onChange={(event) => handleChange(index, event)}
                    // value={
                    //   dato.celularEncargado.length > 10
                    //     ? crypto.AES.decrypt(
                    //         dato.celularEncargado,
                    //         "palabraClave"
                    //       ).toString(crypto.enc.Utf8)
                    //     : dato.celularEncargado
                    // }
                  />
                </div>

                <div className="col">
                  <label htmlFor="">Carnet de Identidad:</label>
                  <input
                    type="number"
                    name="ci"
                    placeholder="Introduzca carnet de identidad"
                    className="form-control"
                    onChange={(event) => handleChange(index, event)}
                    // value={
                    //   dato.celularEncargado.length > 10
                    //     ? crypto.AES.decrypt(
                    //         dato.celularEncargado,
                    //         "palabraClave"
                    //       ).toString(crypto.enc.Utf8)
                    //     : dato.celularEncargado
                    // }
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
              <button className="btn btn-success m-1" type="submit">
                Abrir Proceso Eleccionario
              </button>
            </div>
          </form>
        )}
      </div>
      <ListaProcesosEleccionarios ProcesosElectorales={ProcesosElectorales} />
    </>
  );
};

export default ProcesoEleccionario;
