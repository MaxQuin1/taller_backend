const express = require("express");
const trabajosControllers = require('../controllers/trabajosControllers')
const router = express.Router();

router.get("/", trabajosControllers.verTrabajos);
router.get("/:id", trabajosControllers.verTrabajosPorId);

module.exports = router