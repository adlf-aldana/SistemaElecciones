const { Schema, model } = require("mongoose");

const votanteSchema = new Schema(
  {
    cu: {
      type: Number,
      require: true,
      trim: true,
      unique: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    encargadoMesa: {
      type: Boolean,
    },
    verificadorVotante: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("votanteModels", votanteSchema);
