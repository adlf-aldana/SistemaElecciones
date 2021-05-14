import React, { Fragment } from "react";

const Cards = ({
  EncargadoMesa,
  estudiante,
  editarUniversitario,
  eliminar,
}) => {
  return (
    <Fragment>
      <div className="card mt-5">
        <div className="card-header text-center">
          <strong>
            {EncargadoMesa
              ? "DATOS DEL ENCARGADO DE MESA"
              : "DATOS DEL ESTUDIANTE"}
          </strong>
        </div>
        <div className="card-body">
          <div className="row mt-3">
            <div className="col">
              <strong>Nombre: </strong>
              <label htmlFor="">
                {EncargadoMesa ? EncargadoMesa.nombre : estudiante.nombre}
              </label>
            </div>
            <div className="col">
              <strong>Apellidos: </strong>
              <label htmlFor="">
                {EncargadoMesa ? EncargadoMesa.apellidos : estudiante.apellidos}
              </label>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <strong>Carnet Universitario: </strong>
              <label htmlFor="">
                {EncargadoMesa ? EncargadoMesa.cuEncargado : estudiante.cu}
              </label>
            </div>
            <div className="col">
              <strong>Carrera: </strong>
              <label htmlFor="">
                {EncargadoMesa ? EncargadoMesa.carrera : estudiante.carrera}
              </label>
            </div>
          </div>
          {EncargadoMesa ? (
            <button className="btn btn-success mt-3">Confirmar</button>
          ) : (
            <div>
              <button
                onClick={() => editarUniversitario(estudiante)}
                className="btn btn-warning mt-3 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(estudiante._id)}
                className="btn btn-danger mt-3"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
// const Cards = ({ EncargadoMesa, votante }) => {
//   return (
//     <Fragment>
//       <div className="card mt-5">
//         <div className="card-header text-center">
//           <strong>
//             {EncargadoMesa
//               ? "DATOS DEL ENCARGADO DE MESA"
//               : "DATOS DEL VOTANTE"}
//           </strong>
//         </div>
//         <div className="card-body">
//           <div className="row mt-3">
//             <div className="col">
//               <strong>Nombre: </strong>
//               <label htmlFor="">
//                 {EncargadoMesa ? EncargadoMesa.nombre : votante.nombre}
//               </label>
//             </div>
//             <div className="col">
//               <strong>Apellidos: </strong>
//               <label htmlFor="">
//                 {EncargadoMesa ? EncargadoMesa.apellidos : votante.apellidos}
//               </label>
//             </div>
//           </div>

//           <div className="row mt-3">
//             <div className="col">
//               <strong>Carnet Universitario: </strong>
//               <label htmlFor="">
//                 {EncargadoMesa ? EncargadoMesa.cuEncargado : votante.cu}
//               </label>
//             </div>
//             <div className="col">
//               <strong>Carrera: </strong>
//               <label htmlFor="">
//                 {EncargadoMesa ? EncargadoMesa.carrera : votante.carrera}
//               </label>
//             </div>
//           </div>
//           {!EncargadoMesa ? (
//             <button className="btn btn-success mt-3">Confirmar</button>
//           ) : null}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

export default Cards;
