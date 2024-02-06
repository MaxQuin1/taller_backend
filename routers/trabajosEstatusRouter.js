const express = require("express");
const trabajosEstatusControllers = require('../controllers/trabajosEstatusControllers')
const router = express.Router();

router.get("/enProceso", trabajosEstatusControllers.verTrabajosEnProceso);
router.get("/terminado", trabajosEstatusControllers.verTrabajosTerminados);
router.put("/:id", trabajosEstatusControllers.terminarTrabajo);

module.exports = router