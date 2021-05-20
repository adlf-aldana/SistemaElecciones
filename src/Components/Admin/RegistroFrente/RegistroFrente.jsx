import React, { Fragment, useContext, useEffect, useState } from "react";
import alertaContext from "../../../context/alerta/alertaContext";
import FrentesContext from "../../../context/frentes/FrentesContext";
import FileImage from "./fileImg/FileImage";
import ListaFrente from "./ListaFrente";

const RegistroFrente = () => {
  const frentesContext = useContext(FrentesContext);
  const {
    frentes,
    datosFormulario,
    mensaje,
    estudiante,
    obtenerFrentes,
    agregarFrente,
    eliminarFrente,
    actualizarFrente,
    limpiarFormulario,
    busquedaUniversitario,
    limpiarMensaje,
  } = frentesContext;

  const alertacontext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertacontext;

  const [editUni, seteditUni] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);
  const [datosForm, setdatosForm] = useState(datosFormulario);

  const { nombreFrente, cuEncargado, celularEncargado, logoFrente } = datosForm;

  const handleChange = (e) => {
    setdatosForm({
      ...datosForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (nombreFrente.trim() === "" || logoFrente == "") {
      mostrarAlerta("Error: Todos los campos deben estar llenos", "danger");
      return;
    }
    if (
      nombreFrente.length < 2 ||
      cuEncargado.length < 6 ||
      celularEncargado.length < 8
    ) {
      mostrarAlerta(
        "Error: Los campos deben ser mayores a 3 caracteres, Carnet Universitario 6 digitos y celular 8 digitos",
        "danger"
      );
      return;
    }
    if (cuEncargado.length > 6 || celularEncargado.length > 8) {
      mostrarAlerta("Error: limites de", "danger");
      return;
    }
    const dataimg = new FormData();
    dataimg.append("nombreFrente", nombreFrente);
    dataimg.append("cuEncargado", cuEncargado);
    dataimg.append("celularEncargado", celularEncargado);
    dataimg.append("logoFrente", logoFrente);
    if (editUni._id) {
      actualizarFrente(editUni._id, dataimg);
      mostrarAlerta("Actualizacion Existosa", "success");
    } else {
      agregarFrente(dataimg);
      mostrarAlerta("Guardado Existoso", "success");
    }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Esta seguro de eliminar?")) {
      eliminarFrente(id);
      mostrarAlerta("Eliminado Existoso", "success");
    }
  };

  const editar = (datos) => {
    // setdatosForm(datos);
    seteditUni(datos);
    //   // setImgPreview("http://192.168.0.6:4000/" + datos.logoFrente);
    setImgPreview("http://localhost:4000/" + datos.logoFrente);
  };

  const cleanForm = () => {
    limpiarFormulario();
    setImgPreview("");
  };

  const verificarEncargado = async () => {
    await busquedaUniversitario(cuEncargado);
  };

  useEffect(() => {
    if (editUni.length !== 0)
      setdatosForm({
        nombreFrente: editUni.nombreFrente,
        cuEncargado: editUni.cuEncargado,
        celularEncargado: editUni.celularEncargado,
        logoFrente: editUni.logoFrente,
        cantVotos: editUni.cantVotos,
      });
  }, [datosFormulario, editUni]);
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
      limpiarMensaje();
    }
  }, [mensaje]);
  useEffect(() => {
    setdatosForm({
      nombreFrente: "",
      cuEncargado: "",
      celularEncargado: "",
      logoFrente: "",
    });
    setImgPreview("");
    seteditUni("");
  }, [datosFormulario]);
  useEffect(() => {
    obtenerFrentes();
  }, []);

  return (
    <Fragment>
      <div className="container mt-3">
        <h1 className="text-center">Registro Frente</h1>
        {alerta ? (
          <div className={`alert alert-${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        <form onSubmit={onSubmit}>
          <div className="row mt-3">
            <div className="col">
              <label htmlFor="">Nombre del Frente:</label>
              <input
                type="text"
                name="nombreFrente"
                placeholder="Nombre del Frente"
                className="form-control"
                onChange={handleChange}
                value={nombreFrente}
                maxLength={30}
              />
            </div>

            <div className="col">
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
            </div>

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

          <div className="row mt-3">
            <div className="col">
              <label htmlFor="">Teléfono Celular del Encargado:</label>
              <input
                type="number"
                name="celularEncargado"
                placeholder="Teléfono Celular del Encargado"
                className="form-control"
                onChange={handleChange}
                value={celularEncargado}
              />
            </div>
          </div>

          <div className="row flex-row-reverse">
            <button
              className="btn btn-primary m-1"
              type="button"
              onClick={cleanForm}
            >
              Limpiar
            </button>
            {editUni._id ? (
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
            <div className="col-md-10">
              <FileImage
                setImgPreview={setImgPreview}
                imgPreview={imgPreview}
                datosForm={datosForm}
                setdatosForm={setdatosForm}
              />
            </div>
          </div>
        </form>
      </div>
      <ListaFrente frentes={frentes} eliminar={eliminar} editar={editar} />
    </Fragment>
  );
};

export default RegistroFrente;
