const { Schema, model } = require("mongoose");

const universitarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      // unique: true
    },
    apellidos: {
      type: String,
      require: true,
      trim: true,
    },
    cu: {
      type: Number,
      require: true,
      trim: true,
    },
    carrera: {
      type: String,
      require: true,
      trim: true,
    },
    cargo: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    // fecha y hora de creación o edicion de universitario
    timestamps: true,
  }
);

module.exports = model("universitarioModel", universitarioSchema);
