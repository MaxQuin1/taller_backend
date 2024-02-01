const { json } = require("express");
const connection = require("../database");

function crearMaterial(request, response) {
  const trabajo_id = request.body.id;
  const material = request.body.material;
  const precio = request.body.precio;
  connection.query(
    `INSERT INTO materiales(material, precio, trabajo_id)
    VALUES (?,?,?);`,
    [material, precio, trabajo_id],
    (error, results) => {
      if (error) {
        console.error("Error al ejecutar:", error);
        response.status(500).json({ error: "Error al crear el material" });
      } else {
        response.status(200).json(results);
      }
    }
  );
}

function verMaterialesPorId(request, response) {
  const id = request.params.id;

  connection.query(`SELECT * FROM materiales WHERE trabajo_id = ?`,[id], (error, results) => {
    if (error) {
      console.error("Error al obtener los materiales:", error);
      response.status(500).json({ error: "Error al obtener los materiales" });
    } else {
      response.status(200).json(results);
    }
  });
}

module.exports = {
  crearMaterial,
  verMaterialesPorId,
};
