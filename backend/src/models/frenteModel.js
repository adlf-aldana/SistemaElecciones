const { Schema, model } = require("mongoose");

const frenteSchema = new Schema(
  {
    nombreFrente: {
      type: String,
      require: true,
      trim: true,
    },
    nombreEncargado: {
      type: String,
      require: true,
      trim: true,
    },
    apellidosEncargado: {
      type: String,
      require: true,
      trim: true,
    },
    cuEncargado: {
      type: Number,
      require: true,
      trim: true,
    },
    celularEncargado: {
      type: Number,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("frenteModel", frenteSchema);
