import React, { Fragment, useEffect } from "react";

const RegistroUniversitario = ({
  datosEstudiantes,
  handleForm,
  onSubmitForm,
  optionCargo,
  limpiarFormulario,
  alerta,
  editUni,
}) => {
  const { nombre, apellidos, cu, carrera, cargo } = datosEstudiantes;

  return (
    <Fragment>
      <h3 className="text-center m-3">Registro Universitario</h3>
      <form onSubmit={onSubmitForm}>
        <span className="badge bg-light text-dark">
          (*) Campos Obligatorios
        </span>
        {alerta.alerta !== null ? (
          <div className={`alert alert-${alerta.alerta.categoria}`}>
            {alerta.alerta.msg}
          </div>
        ) : null}
        <div className="row mt-3">
          <div className="col">
            <label htmlFor="">Nombre: *</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="form-control"
              onChange={handleForm}
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
              onChange={handleForm}
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
              onChange={handleForm}
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
              onChange={handleForm}
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
              onChange={handleForm}
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
          {editUni ? (
            <button type="submit" className="btn btn-warning">
              Editar
            </button>
          ) : (
            <button type="submit" className="btn btn-success">
              Guardar
            </button>
          )}

          <button
            type="button"
            onClick={limpiarFormulario}
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
