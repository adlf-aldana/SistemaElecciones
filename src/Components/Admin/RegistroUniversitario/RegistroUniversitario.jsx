import React, { Fragment, useContext, useEffect } from "react";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as crypto from "crypto-js";

const RegistroUniversitario = ({
  datosEstudiantes,
  handleForm,
  onSubmitForm,
  optionCargo,
  limpiarFormulario,
  alerta,
  editUni,
}) => {
  const { nombre, apellidos, cu, ci, carrera, cargo } = datosEstudiantes;
  const universitarioContext = useContext(UniversitarioContext);
  const { estudiantes } = universitarioContext;

  const listaEstudiantes = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "letter",
    });

    const widthPage = doc.internal.pageSize.getWidth();

    doc.text("LISTA DE ESTUDIANTES UNIVERSITARIOS", widthPage / 2, 10);
    doc.autoTable({
      head: [
        [
          { content: "Nombre (s)" },
          { content: "Apellido (s)" },
          { content: "Carrera" },
          { content: "Cargo" },
          { content: "Carnet Universitario" },
          { content: "Carnet Identidad" },
        ],
      ],
    });
    estudiantes.map((estudiante) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 38 },
          1: { cellWidth: 40 },
          2: { cellWidth: 30 },
          3: { cellWidth: 25 },
          3: { cellWidth: 40 },
        },
        body: [
          [
            crypto.AES.decrypt(estudiante.nombre, "palabraClave").toString(
              crypto.enc.Utf8
            ),
            crypto.AES.decrypt(estudiante.apellidos, "palabraClave").toString(
              crypto.enc.Utf8
            ),
            crypto.AES.decrypt(estudiante.carrera, "palabraClave").toString(
              crypto.enc.Utf8
            ),
            crypto.AES.decrypt(estudiante.cargo, "palabraClave").toString(
              crypto.enc.Utf8
            ),
            crypto.AES.decrypt(estudiante.cu, "palabraClave").toString(
              crypto.enc.Utf8
            ),
            crypto.AES.decrypt(estudiante.ci, "palabraClave").toString(
              crypto.enc.Utf8
            ),
          ],
        ],
      });
    });
    doc.save("listaEstudiantes.pdf");
  };

  return (
    <Fragment>
      <h3 className="text-center m-3">Registro Universitario</h3>
      <button
        className="btn btn-success mr-3"
        onClick={() => listaEstudiantes()}
      >
        Reporte Lista de Estudiantes
      </button>
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
            <label htmlFor="">Carnet de Identidad: *</label>
            <input
              type="number"
              name="ci"
              placeholder="Carnet Identidad"
              className="form-control"
              onChange={handleForm}
              value={ci}
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
        {cargo === "Administrador" ||
        cargo === "Encargado de Mesa" ||
        cargo === "Verificador de Votante" ? (
          <div className="row mt-3">
            <div className="col">
              <label htmlFor="">Contraseña: *</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={handleForm}
              />
            </div>
            <div className="col">
              <label htmlFor="">Repetir Contraseña: *</label>
              <input
                type="password"
                className="form-control"
                name="confirPassword"
                id="confirPassword"
                onChange={handleForm}
              />
            </div>
          </div>
        ) : null}
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
