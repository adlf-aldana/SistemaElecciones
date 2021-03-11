const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => res.send("universitarios"));

module.exports = router;
