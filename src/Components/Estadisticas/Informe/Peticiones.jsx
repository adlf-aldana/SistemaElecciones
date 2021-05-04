import axios from "axios";

const URL_FRENTES = "http://localhost:4000/api/frente_universitario/";
const URL_UNIVERSITARIOS = "http://localhost:4000/api/lista_estudiantes/";

export const getUniversitarios = async () => {
  const res = await axios
    .get(URL_UNIVERSITARIOS)
    .then((data) => Object.keys(data.data).length);
  return res;
};

export const datosFrente = async () => {
  const res = await axios.get(URL_FRENTES);
  return res.data;
};

export const porcentajes = async () => {
  const datos = await datosFrente();
  const cantEstudiantes = await getUniversitarios();
  return datos.map((dato) =>
    ((dato.cantVotos * 100) / cantEstudiantes).toFixed(2)
  );
};
