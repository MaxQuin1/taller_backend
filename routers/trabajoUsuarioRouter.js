const express = require("express");
const trabajoUsuarioControllers = require('../controllers/trabajoUsuarioControllers')
const router = express.Router();

router.get("/:id", trabajoUsuarioControllers.verTrabajosPorIdUsuario);

module.exports = router