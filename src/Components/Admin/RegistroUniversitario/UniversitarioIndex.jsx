import React, { Fragment, useContext, useEffect, useState } from "react";
import Cards from "../../Usuario/encargadoMesa/Cards";
import ListaUniversitarios from "./ListaUniversitarios";
import RegistroUniversitario from "./RegistroUniversitario";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";
import alertaContext from "../../../context/alerta/alertaContext";

const UniversitarioIndex = () => {
  // CONTEXT
  const alerta = useContext(alertaContext);
  const { mostrarAlerta } = alerta;
  const universitarioContext = useContext(UniversitarioContext);
  const {
    estudiantes,
    mensaje,
    estudiante,
    datosFormulario,
    obtenerUniversitarios,
    agregarUniversitario,
    eliminarUniversitario,
    actualizarUniversitario,
    busquedaUniversitario,
    limpiarFormulario,
  } = universitarioContext;

  // STATES
  const [editUni, seteditUni] = useState([]);
  const [carnetUniversitario, setCarnetUniversitario] = useState("");
  const [mensajeBusqueda, setMensajeBusqueda] = useState("");

  // STATE OPCIONES
  const [optionCargo, setoptionCargo] = useState([
    { name: "Administrador" },
    { name: "Estudiante" },
    { name: "Encargado de Mesa" },
    { name: "Verificador de Votante" },
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

  const { nombre, apellidos, cu, carrera, cargo } = datosEstudiantes;

  // SUBMIT FORM
  const onSubmitForm = async (e) => {
    e.preventDefault();
    // VALIDACION
    if (
      nombre.trim() === "" ||
      apellidos.trim() === "" ||
      carrera.trim() === "" ||
      cargo.trim() === ""
    ) {
      return mostrarAlerta("Todos los campos deben estar llenos", "danger");
    }
    if (cu.toString().length !== 6) {
      return mostrarAlerta(
        "El carnet universitario debe tener 6 caracteres",
        "danger"
      );
    }
    // GUARDAR DATOS
    guardarEditarUniversitario(datosEstudiantes);
  };

  // const limpiarForm = () => {
  //   setdatosEstudiantes({
  //     nombre: "",
  //     apellidos: "",
  //     cu: "",
  //     carrera: "",
  //     cargo: "",
  //   });
  //   // Limpiando select
  //   setoptionCargo([
  //     { name: "Administrador" },
  //     { name: "Estudiante" },
  //     { name: "Encargado de Mesa" },
  //     { name: "Verificador de Votante" },
  //   ]);
  //   seteditUni("");
  // };
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    if (editUni.length !== 0)
      setdatosEstudiantes({
        nombre: editUni.nombre,
        apellidos: editUni.apellidos,
        cu: editUni.cu,
        carrera: editUni.carrera,
        cargo: editUni.cargo,
      });
  }, [mensaje, editUni]);

  useEffect(() => {
    setdatosEstudiantes({
      nombre: "",
      apellidos: "",
      cu: "",
      carrera: "",
      cargo: "",
    });
    seteditUni("");
  }, [datosFormulario]);

  // GUARDA O EDITA DATOS
  const guardarEditarUniversitario = (datosEstudiantes) => {
    if (editUni._id) {
      actualizarUniversitario(editUni._id, datosEstudiantes);
      mostrarAlerta("Editado correctamenta", "success");
    } else {
      agregarUniversitario(datosEstudiantes);
      mostrarAlerta("Guardado correctamenta", "success");
    }
  };

  // ELIMINAR DATO
  const eliminar = async (id) => {
    if (window.confirm("¿Esta seguro de eliminar?")) {
      eliminarUniversitario(id);
      mostrarAlerta("Eliminado correctamenta", "success");
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
    obtenerUniversitarios();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <RegistroUniversitario
          datosEstudiantes={datosEstudiantes}
          handleForm={handleForm}
          onSubmitForm={onSubmitForm}
          optionCargo={optionCargo}
          limpiarFormulario={limpiarFormulario}
          alerta={alerta}
          editUni={editUni}
        />
        <ListaUniversitarios
          estudiantes={estudiantes}
          eliminar={eliminar}
          editarUniversitario={editarUniversitario}
        />
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
            />
          ) : (
            <strong>
              <p className="text-center mt-3">{mensajeBusqueda}</p>
            </strong>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default UniversitarioIndex;
