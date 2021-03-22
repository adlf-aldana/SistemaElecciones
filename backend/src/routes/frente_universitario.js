const { Router } = require("express");
const router = Router();
const {
  getFrentes,
  createFrente,
  getFrente,
  updateFrente,
  deleteFrente,
} = require("../controllers/frenteController");

router.route("/").get(getFrentes).post(createFrente);

router
  .route("/:id")
  .get(getFrente)
  .put(updateFrente)
  .delete(deleteFrente);

module.exports = router;
