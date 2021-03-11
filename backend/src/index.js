const app = require("./app");

// será la encargada de iniciar el programa
async function main() {
  //Inicializando servidor
  await app.listen(4000);
  console.log("Server on port 4000");
}

main();
