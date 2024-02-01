const express = require("express");
const materialesControllers = require('../controllers/materialesControllers')
const router = express.Router();

router.post("/", materialesControllers.crearMaterial);
router.get("/:id", materialesControllers.verMaterialesPorId);

module.exports = router