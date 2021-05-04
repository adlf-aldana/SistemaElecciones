import { datosFrente, porcentajes } from "./Peticiones";

export const dataGraphics = async () => {
  const nombres = await datosFrente().then((data) =>
    Object.values(data).map((key) => key.nombreFrente)
  );
  // const votos = await datosFrente().then((data) =>
  //   Object.values(data).map((key) => key.cantVotos)
  // );
  const porcentajeVotos = await porcentajes();
  return {
    type: "bar",
    labels: nombres,
    datasets: [
      {
        label: "Elecciones Centro de Estudiantes al 100%",
        data: porcentajeVotos,

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
};