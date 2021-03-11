import React, { Fragment, useState } from "react";

const RegistroUniversitario = ({estudiantes, guardarEstudiante}) => {
  

  const [datosEstudiantes, setdatosEstudiantes] = useState()

  const handleChange = (e) => {
    setdatosEstudiantes({
        ...datosEstudiantes,
        [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    guardarEstudiante(datosEstudiantes)
  };
  return (
    <Fragment>
      <div className="container">
        <h3 className="text-center">Registro Universitario</h3>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col">
              <label htmlFor="">Nombre: </label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <label htmlFor="">Apellidos: </label>
              <input
                type="text"
                name="apellido"
                placeholder="Apellidos"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Guardar
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default RegistroUniversitario;
