const { Router } = require("express");
const router = Router();
const {
  getUniversitarios,
  createUniversitario,
  getUniversitario,
  updateUniversitario,
  deleteUniversitario,
} = require("../controllers/universitariosController");

router.route("/").get(getUniversitarios).post(createUniversitario);

router
  .route("/:id")
  .get(getUniversitario)
  .put(updateUniversitario)
  .delete(deleteUniversitario);

module.exports = router;
