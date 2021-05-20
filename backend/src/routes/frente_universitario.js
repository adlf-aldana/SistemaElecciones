const { Router } = require("express");
const multer = require("multer");
const router = Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { check } = require('express-validator')

const {
  getFrentes,
  createFrente,
  getFrente,
  updateFrente,
  deleteFrente,
} = require("../controllers/frenteController");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "/../../public/images"),
  filename: (req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
router
  .route("/")
  .get(getFrentes)
  .post(upload.single("logoFrente"), createFrente);

  // [check('nombreFrente', 'El nombre es obligatorio').not().isEmpty(),
  // check('cuEncargado', 'El Carnet Universitario es obligatorio').not().isEmpty(),
  // check('celularEncargado', 'El campo Celular es obligatorio').not().isEmpty(),
  // check('logoFrente', 'Logo es obligatorio').not().isEmpty(),
  // ],


router
  .route("/:id")
  .get(getFrente)
  .put(upload.single("logoFrente"), updateFrente)
  .delete(deleteFrente)

module.exports = router;
