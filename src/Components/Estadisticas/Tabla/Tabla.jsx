// import * as crypto from 'crypto-js'
const Tabla = ({ datosFrente }) => {
  return (
    <div className="container">
      <h4 className="text-center">TABLA DE DATOS</h4>
      <table className="table text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Frente</th>
            <th>Cantidad de Votos</th>
            <th>Porcentaje de Votos</th>
          </tr>
        </thead>
        <tbody>
          {datosFrente.map((frente, index) => (
            <tr key={frente._id}>
              <td> {index + 1}</td>
              {/* <td>{crypto.AES.decrypt(frente.nombreFrente, 'palabraClave').toString(crypto.enc.Utf8)}</td> */}
              <td>{frente.nombreFrente}</td>
              <td>{frente.cantVotos}</td>
              <td>{frente.porcentaje} %</td>
              {/* <td>{datosPorcentajes[index]} %</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
