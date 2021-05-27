import React, { Fragment, useState, useContext, useEffect } from "react";
import Cards from "./Cards";

import AuthContext from "../../../context/autenticacion/authContext";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";

const EncargadoMesa = () => {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;
  const universitarioContext = useContext(UniversitarioContext);
  const { estudiante, busquedaUniversitario } = universitarioContext;
  // DATOS DEL FORMULARIO

  const [dataForm, setdataForm] = useState({
    cuUniversitario: "",
  });

  const handleChange = (e) => {
    setdataForm({ [e.target.name]: e.target.value });
  };

  const { cuUniversitario } = dataForm;

  const onSubmit = (e) => {
    e.preventDefault();
    busquedaUniversitario(cuUniversitario);
  };

  useEffect(() => {
    usuarioAutenticado();
  }, [estudiante]);

  return (
    <Fragment>
      <div className="container mt-3">
        {usuario ? <Cards usuario={usuario} /> : null}

        {usuario ? (
          usuario.cargo === "Verificador de Votante" ? null : (
            <form onSubmit={onSubmit}>
              <div className="row mt-3">
                <div className="col-md-3">
                  <strong>Habilitar a Votante:</strong>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    name="cuUniversitario"
                    className="form-control"
                    placeholder="Introduzca carnet universitario"
                    onChange={handleChange}
                    value={cuUniversitario}
                  />
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-success">
                    Buscar
                  </button>
                </div>
                )
              </div>
            </form>
          )
        ) : null}

        {estudiante ? (
          <Cards estudiante={estudiante} usuario={usuario} />
        ) : null}
      </div>
    </Fragment>
  );
};

export default EncargadoMesa;
