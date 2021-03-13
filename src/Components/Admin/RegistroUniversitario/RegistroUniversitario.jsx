import React, { Fragment, useState } from "react";

const RegistroUniversitario = ({
  postEstudiantes,
}) => {
  const [datosEstudiantes, setdatosEstudiantes] = useState({
    nombre: "",
    apellidos: "",
  });

  const handleChange = (e) => {
    setdatosEstudiantes({
      ...datosEstudiantes,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, apellidos } = datosEstudiantes;

  const onSubmit = async (e) => {
    e.preventDefault();
    // guardarEstudiante(datosEstudiantes);
    postEstudiantes(datosEstudiantes);
    setdatosEstudiantes({
      nombre: "",
      apellidos: "",
    });
    // getEstudiantes();
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
          <button type="submit" className="btn btn-success mt-3">
            Guardar
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default RegistroUniversitario;
