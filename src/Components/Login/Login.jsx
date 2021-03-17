import React, { Fragment } from "react";

const Login = () => {
  const mystyle = {
    "max-width": "18rem",
  };

  return (
    <Fragment>
      <div className="row justify-content-md-center">
        <div className="card m-3" style={mystyle}>
          {/* <div className="row justify-content-md-center card-body"> */}
          <div className="card-body">
            {/* <div className="justify-content-md-center"> */}
              <form>
                <h3 className="text-center m-3">INICIAR SESION</h3>
                <div className="row">
                  <div className="col">
                    <label htmlFor="">Usuario:</label>
                    <input
                      type="text"
                      name="cu"
                      placeholder="Usuario"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="">Contraseña:</label>
                    <input
                      type="text"
                      name="password"
                      placeholder="Contraseña"
                      className="form-control"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-success mt-3 col-12">
                  Iniciar Sesion
                </button>
              </form>
            </div>
          </div>
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default Login;
