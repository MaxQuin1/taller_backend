const express = require("express");
const tipoTrabajosControllers = require('../controllers/tipotrabajoControllers')
const router = express.Router();

router.get("/", tipoTrabajosControllers.verTipoTrabajo);
router.get("/:id", tipoTrabajosControllers.verTipoTrabajoPorId);

module.exports = router