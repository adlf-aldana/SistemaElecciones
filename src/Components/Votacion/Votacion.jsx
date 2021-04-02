import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";

const Votacion = () => {
  const [frentes, setfrentes] = useState("");
  const URL = "http://localhost:4000/api/frente_universitario/";

  const getfrentes = async () => {
    const res = await axios.get(URL);
    setfrentes(res.data);
  };

  useEffect(() => {
    getfrentes();
    return () => {};
  }, []);
  return (
    <Fragment>
      <div className="container mt-4">
        <h1 className="text-center">Votación</h1>
        <div className="row">
          {frentes.length > 0 ? (
            frentes.map((frente) => (
              <div className="col-md-4 mt-3" key={frente._id}>
                <div className="card text-center" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:4000/${frente.logoFrente}`}
                    alt="..."
                    width="150"
                    height="160"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{frente.nombreFrente}</h5>
                    <button className="btn btn-primary">Votar</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Sin datos</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Votacion;
