import React, { Fragment, useContext, useEffect, useState } from "react";
import Cards from "../../Usuario/encargadoMesa/Cards";
// import ListaUniversitarios from "./ListaUniversitarios";
import RegistroUniversitario from "./RegistroUniversitario";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";
import alertaContext from "../../../context/alerta/alertaContext";
import AuthContext from "../../../context/autenticacion/authContext";
import usuarioAxios from "../../../config/axios";

const UniversitarioIndex = () => {
  // CONTEXT
  const alerta = useContext(alertaContext);
  const { mostrarAlerta } = alerta;
  const universitarioContext = useContext(UniversitarioContext);
  const {
    mensaje,
    estudiante,
    datosFormulario,
    obtenerUniversitarios,
    agregarUniversitario,
    eliminarUniversitario,
    actualizarUniversitario,
    busquedaUniversitario,
    limpiarFormulario,
    limpiarMensaje,
  } = universitarioContext;
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  // STATES
  const [editUni, seteditUni] = useState([]);
  const [carnetUniversitario, setCarnetUniversitario] = useState("");
  const [mensajeBusqueda, setMensajeBusqueda] = useState("");
  const [ultimoProcesoElectoral, setultimoProcesoElectoral] = useState([]);
  const [cargarPagina, setcargarPagina] = useState(false);

  // STATE OPCIONES
  const [optionCargo, setoptionCargo] = useState([
    { name: "Administrador" },
    { name: "Estudiante" },
  ]);

  // STATE FORM
  const [datosEstudiantes, setdatosEstudiantes] = useState(datosFormulario);

  // HANDLE FORM
  const handleForm = (e) => {
    setdatosEstudiantes({
      ...datosEstudiantes,
      [e.target.name]: e.target.value,
    });
  };

  const {
    nombre,
    apellidos,
    cu,
    ci,
    carrera,
    cargo,
    password,
    confirPassword,
    email,
  } = datosEstudiantes;

  // SUBMIT FORM
  const onSubmitForm = async (e) => {
    e.preventDefault();
    // VALIDACION
    if (
      nombre.trim() === "" ||
      apellidos.trim() === "" ||
      carrera.trim() === "" ||
      cargo.trim() === "" ||
      ci.trim() === "" ||
      email.trim() === ""
    ) {
      return mostrarAlerta("Todos los campos deben estar llenos", "danger");
    }
    if (
      (cargo.trim() === "Administrador" ||
        cargo.trim() === "Encargado de Mesa" ||
        cargo.trim() === "Verificador de Votante") &&
      password === ""
    ) {
      return mostrarAlerta("Contraseña es obligatorio", "danger");
    }
    if (password !== confirPassword) {
      return mostrarAlerta("Las contraseñas no coinciden", "danger");
    }
    if (cu.toString().length !== 6) {
      return mostrarAlerta(
        "El carnet universitario debe tener 6 caracteres",
        "danger"
      );
    }
    if (ci.toString().length !== 7) {
      return mostrarAlerta(
        "El carnet de identidad debe tener 7 caracteres",
        "danger"
      );
    }
    // GUARDAR DATOS
    guardarEditarUniversitario(datosEstudiantes);
  };

  // GUARDA O EDITA DATOS
  const guardarEditarUniversitario = (datosEstudiantes) => {
    if (editUni.id) {
      actualizarUniversitario(editUni.id, datosEstudiantes);
      mostrarAlerta("Editado correctamenta", "success");
      setcargarPagina(!cargarPagina);
    } else {
      agregarUniversitario(
        datosEstudiantes,
        ultimoProcesoElectoral[0].registro
      );
      mostrarAlerta("Guardado correctamenta", "success");
      setcargarPagina(!cargarPagina);
    }
  };

  // ELIMINAR DATO
  const eliminar = async (id) => {
    if (window.confirm("¿Esta seguro de eliminar?")) {
      eliminarUniversitario(id);
      mostrarAlerta("Eliminado correctamenta", "success");
      setcargarPagina(!cargarPagina);
    }
  };

  // EDITAR DATOS
  const editarUniversitario = (datos) => {
    seteditUni(datos);
  };

  // HANDLE BUSQUEDA
  const handleBusqueda = (e) => {
    setCarnetUniversitario(e.target.value);
  };

  // SUBMIT BUSQUEDA
  const onSubmitBusqueda = async (e) => {
    e.preventDefault();
    busquedaUniversitario(carnetUniversitario);

    if (estudiante === null) {
      setTimeout(() => {
        setMensajeBusqueda("");
      }, 3000);
      setMensajeBusqueda("NO SE ENCONTRÓ AL ESTUDIANTE");
    }
  };

  useEffect(() => {
    const ultimoProcesoEleccionario = () => {
      usuarioAxios.get("/api/procesoElectoral").then((res) => {
        setultimoProcesoElectoral(res.data.ultimoProcesoElectoral);
        obtenerUniversitarios(res.data.ultimoProcesoElectoral);
      });
    };
    ultimoProcesoEleccionario();
  }, [cargarPagina]);

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
      limpiarMensaje();
    }
    if (editUni.length !== 0)
      setdatosEstudiantes({
        nombre: editUni.nombre,
        apellidos: editUni.apellidos,
        cu: editUni.cu,
        ci: editUni.ci,
        carrera: editUni.carrera,
        cargo: editUni.cargo,
        email: editUni.email,
      });
  }, [mensaje, editUni]);

  useEffect(() => {
    setdatosEstudiantes({
      nombre: "",
      apellidos: "",
      cu: "",
      ci: "",
      carrera: "",
      cargo: "",
      password: "",
      confirPassword: "",
      email: "",
    });
    seteditUni("");
  }, [datosFormulario]);

  return (
    <Fragment>
      <div className="container">
        {ultimoProcesoElectoral.length > 0 ? (
          ultimoProcesoElectoral[0].estado ? (
            <>
              <RegistroUniversitario
                datosEstudiantes={datosEstudiantes}
                handleForm={handleForm}
                onSubmitForm={onSubmitForm}
                optionCargo={optionCargo}
                limpiarFormulario={limpiarFormulario}
                alerta={alerta}
                editUni={editUni}
                mostrarAlerta={mostrarAlerta}
              />
              {/* <ListaUniversitarios
          estudiantes={estudiantes}
          eliminar={eliminar}
          editarUniversitario={editarUniversitario}
        /> */}
              <br />
              <form onSubmit={onSubmitBusqueda}>
                <h3 className="text-center">Buscar Estudiante</h3>

                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name="cuUniversitario"
                      className="form-control"
                      placeholder="Introduzca carnet universitario"
                      onChange={handleBusqueda}
                      value={carnetUniversitario}
                    />
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-success">
                      Buscar
                    </button>
                  </div>
                </div>

                {estudiante ? (
                  <Cards
                    estudiante={estudiante}
                    editarUniversitario={editarUniversitario}
                    eliminar={eliminar}
                    usuario={usuario}
                  />
                ) : (
                  <strong>
                    <p className="text-center mt-3">{mensajeBusqueda}</p>
                  </strong>
                )}
              </form>
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

export default UniversitarioIndex;
