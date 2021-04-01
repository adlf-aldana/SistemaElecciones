const { Router } = require("express");
const multer = require("multer");
const router = Router();

const {
  getFrentes,
  createFrente,
  getFrente,
  updateFrente,
  deleteFrente,
} = require("../controllers/frenteController");

const upload = multer({ dest: `${__dirname}/../../public/images` });
router
  .route("/")
  .get(getFrentes)
  .post(upload.single("logoFrente"), createFrente);

router.route("/:id").get(getFrente).put(updateFrente).delete(deleteFrente);

module.exports = router;
