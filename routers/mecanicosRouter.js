const express = require("express");
const mecanicosControllers = require('../controllers/mecanicosControllers')
const router = express.Router();

router.post("/", mecanicosControllers.crearMecanico);
router.get("/", mecanicosControllers.verMecanicos);
router.get("/:id", mecanicosControllers.verMecanicosPorId);
router.put("/:id", mecanicosControllers.editarMecanico);
router.delete("/:id", mecanicosControllers.eliminarMecanico);

module.exports = router