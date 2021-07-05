import React, { useEffect, useState } from "react";
import usuarioAxios from "../../../config/axios";

const ListarMesas = ({ actualizarLista, eliminar, setMesas, mesas }) => {
  // HABILITA O DESHABILITA UNA MESA PARA VOTAR
  const habilitarMesa = async (habilitado, ids) => {
    try {
      ids.map(async (id) => {
        const res = await usuarioAxios.put(`/api/mesas/${id}`, habilitado);
        // console.log(res.data);
        // setMesas(res.data.mesas);
        setMesas(res.data.numMesa);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // OBTENIENDO MESAS E IDS
  // useEffect(async () => {
  //   try {
  //     const res = await usuarioAxios.get("/api/mesas");
  //     setMesas(res.data.numMesa);
  //   } catch (e) {
  //     console.log(e.response);
  //   }
  // }, [actualizarLista]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de Mesas</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>N° de Mesa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas ? (
            mesas.map((mesa, index) => (
              <tr key={mesa._id}>
                <td>{index + 1}</td>
                <td>{mesa._id}</td>
                <td>
                  {mesa.habilitado[0] ? (
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => habilitarMesa(mesa.habilitado, mesa.id)}
                    >
                      Deshabilitar
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => habilitarMesa(mesa.habilitado, mesa.id)}
                    >
                      Habilitar
                    </button>
                  )}

                  <button
                    className="btn btn-warning mr-2"
                    //   onClick={() => editar(frente._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminar(mesa.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p className="text-center">No hay mesas registradas</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListarMesas;
