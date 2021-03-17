import React, { Fragment, useEffect, useState, useRef } from "react";

const RegistroUniversitario = ({ postEstudiantes, editUni }) => {
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
    postEstudiantes(datosEstudiantes);
    cleanForm();
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
        <div className="row mt-3">
          <div className="col">
            <label htmlFor="">Nombre: </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="form-control"
              onChange={handleChange}
              value={nombre}
            />
          </div>

          <div className="col">
            <label htmlFor="">Apellidos: </label>
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              className="form-control"
              onChange={handleChange}
              value={apellidos}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <label htmlFor="">Carnet Universitario:</label>
            <input
              type="number"
              name="cu"
              placeholder="Carnet universitario"
              className="form-control"
              onChange={handleChange}
              value={cu}
            />
          </div>
          <div className="col">
            <label htmlFor="">Carrera:</label>
            <input
              type="text"
              name="carrera"
              placeholder="Carrera"
              className="form-control"
              onChange={handleChange}
              value={carrera}
            />
          </div>
          <div className="col">
            <label htmlFor="">Cargo:</label>
            <select
              name="cargo"
              value={cargo}
              className="form-control"
              onChange={handleChange}
            >
              <option value="">Seleccione un cargo</option>
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
