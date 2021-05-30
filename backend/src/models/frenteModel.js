const { Schema, model } = require("mongoose");

const frenteSchema = new Schema(
  {
    nombreFrente: {
      type: String,
      require: true,
      trim: true,
    },
    cuEncargado: {
      type: Number,
      require: true,
      trim: true,
      unique: true,
    },
    celularEncargado: {
      type: Number,
      require: true,
      trim: true,
    },
    logoFrente: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("frenteModel", frenteSchema);
