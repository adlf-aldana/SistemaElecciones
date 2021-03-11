const mongoose = require("mongoose");

const URI = "mongodb://localhost/sistema_elecciones";

// Conectar a mongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

// Mensaje si se conecta correctamente a MongoDB
connection.once("open", () => {
  console.log("DB is connected");
});
