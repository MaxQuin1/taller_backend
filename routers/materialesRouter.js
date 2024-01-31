const express = require("express");
const materialesControllers = require('../controllers/materialesControllers')
const router = express.Router();

router.post("/", materialesControllers.crearMaterial);
router.put("/:id", materialesControllers.verMateriales);

module.exports = router