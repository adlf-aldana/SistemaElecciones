import axios from "axios";
import React, { Fragment, useEffect, useState, useRef } from "react";

const RegistroUniversitario = ({
  postEstudiantes,
  editUni,
  message,
  setmessage,
}) => {
  const URL_CU = "http://localhost:4000/api/consulta_universitario_cu/";

  const [optionCargo, setoptionCargo] = useState([
    { name: "Administrador" },
    { name: "Estudiante" },
    { name: "Encargado de Mesa" },
    { name: "Verificador de Votante" },
  ]);

  const [datosEstudiantes, setdatosEstudiantes] = useState({
    nombre: "",
    apellidos: "",
    cu: "",
    carrera: "",
    cargo: "",
  });
  useEffect(() => {
    if (editUni.length !== 0)
      setdatosEstudiantes({
        nombre: editUni.nombre,
        apellidos: editUni.apellidos,
        cu: editUni.cu,
        carrera: editUni.carrera,
        cargo: editUni.cargo,
      });
  }, [editUni]);

  const handleChange = (e) => {
    setdatosEstudiantes({
      ...datosEstudiantes,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, apellidos, cu, carrera, cargo } = datosEstudiantes;

  const onSubmit = async (e) => {
    e.preventDefault();
    const datos2 = await axios.get(URL_CU + cu);
    if (
      datos2.data.msg === null ||
      datos2.data.msg.cu.toString() !== cu.toString()
    ) {
      if (
        nombre.trim() == "" ||
        apellidos.trim() == "" ||
        carrera.trim() == "" ||
        cargo.trim() == ""
      ) {
        setmessage({
          text: "Error: Todos los campos deben estar llenos",
          status: true,
          type: "danger",
        });
        setTimeout(() => {
          setmessage({
            text: "",
            status: false,
            type: "danger",
          });
        }, 5000);
        return;
      }
      if (
        nombre.length < 3 ||
        apellidos.length <= 3 ||
        cu.length < 6 ||
        carrera.length < 3 ||
        cargo.length < 3
      ) {
        setmessage({
          text:
            "Error: Los campos deben ser mayores a 3 caracteres y Carnet Universitario 6 digitos",
          status: true,
          type: "danger",
        });
        setTimeout(() => {
          setmessage({
            text: "",
            status: false,
            type: "",
          });
        }, 5000);
        return;
      }
      if (
        nombre.length > 30 ||
        apellidos.length > 30 ||
        cu.length > 6 ||
        carrera.length > 30 ||
        cargo.length > 30
      ) {
        setmessage({
          text: "Error: Carnet Universitario debe tener 6 digitos",
          status: true,
          type: "danger",
        });
        setTimeout(() => {
          setmessage({
            text: "",
            status: false,
            type: "",
          });
        }, 5000);
        return;
      }
      postEstudiantes(datosEstudiantes);
      cleanForm();
    } else {
      setmessage({
        text: "Error: Ya existe un estudiante con ese Carnet Universitario",
        status: true,
        type: "danger",
      });

      setTimeout(() => {
        setmessage({
          text: "",
          status: false,
          type: "",
        });
      }, 5000);
    }
  };

  const cleanForm = () => {
    setdatosEstudiantes({
      nombre: "",
      apellidos: "",
      cu: "",
      carrera: "",
      cargo: "",
    });
    // Limpiando select
    setoptionCargo([
      { name: "Administrador" },
      { name: "Estudiante" },
      { name: "Encargado de Mesa" },
      { name: "Verificador de Votante" },
    ]);
  };

  return (
    <Fragment>
      <h3 className="text-center m-3">Registro Universitario</h3>
      <form onSubmit={onSubmit}>
        {message.status ? (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        ) : null}
        <span class="badge bg-light text-dark">(*) Campos Obligatorios</span>
        <div className="row mt-3">
          <div className="col">
            <label htmlFor="">Nombre: *</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="form-control"
              onChange={handleChange}
              value={nombre}
              maxLength={30}
            />
          </div>

          <div className="col">
            <label htmlFor="">Apellidos: *</label>
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              className="form-control"
              onChange={handleChange}
              value={apellidos}
              maxLength={30}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <label htmlFor="">Carnet Universitario: *</label>
            <input
              type="number"
              name="cu"
              placeholder="Carnet universitario"
              className="form-control"
              onChange={handleChange}
              value={cu}
            />
            <span class="badge bg-light text-dark">Solo números</span>
          </div>
          <div className="col">
            <label htmlFor="">Carrera: *</label>
            <input
              type="text"
              name="carrera"
              placeholder="Carrera"
              className="form-control"
              onChange={handleChange}
              value={carrera}
              maxLength={30}
            />
          </div>
          <div className="col">
            <label htmlFor="">Cargo: *</label>
            <select
              name="cargo"
              value={cargo}
              className="form-control"
              onChange={handleChange}
            >
              <option value="">Seleccione un cargo: </option>
              {optionCargo.map((e) => (
                <option key={e.name} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
            {/* <select
                name="cargo"
                value={cargo}
                className="form-control"
                onChange={handleChange}
              >
                <option defaultValue>Seleccione un cargo</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Encargado de Mesa">Encargado de Mesa</option>
                <option value="Verificador Votante">Verificador Votante</option>
                <option value="Administrador">Administrador</option>
              </select> */}
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-success">
            Guardar
          </button>
          <button
            type="button"
            onClick={cleanForm}
            className="btn btn-primary ml-2"
          >
            Limpiar
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default RegistroUniversitario;
