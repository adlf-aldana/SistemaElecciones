const mongoose = require("mongoose");

// console.log(process.env.MONGODB_URI);
const URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost/databasetest";

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
