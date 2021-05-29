const { Schema, model } = require("mongoose");

const votanteSchema = new Schema(
  {
    cu: {
      type: Number,
      require: true,
      trim: true,
      unique: true,
    },
    descripcionProblemaEncargadoMesa: {
      type: String,
      trim: true,
    },
    descripcionProblemaVerificadorVotante: {
      type: String,
      trim: true,
    },
    encargadoMesa: {
      type: Boolean,
    },
    verificadorVotante: {
      type: Boolean,
    },
    estadoEncargadoMesa: {
      type: Boolean,
    },
    estadoVerificadorVotante: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("votanteModels", votanteSchema);
