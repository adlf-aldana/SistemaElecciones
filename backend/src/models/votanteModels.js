const { Schema, model } = require("mongoose");

const votanteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      // unique: true
    },
    apellidos: {
      type: String,
      required: true,
      trim: true,
    },
    cu: {
      type: Number,
      require: true,
      trim: true,
      unique: true,
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
    descripcion: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("votanteModels", votanteSchema);
