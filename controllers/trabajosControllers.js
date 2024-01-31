const { json } = require("express");
const connection = require("../database");

function verTrabajos(request, response) {
  connection.query(`SELECT * FROM trabajos`, (error, results) => {
    if (error) {
      console.error("Error al obtener los trabajos:", error);
      response.status(500).json({ error: "Error al obtener los datos" });
    } else {
      response.status(200).json(results);
    }
  });
}

function verTrabajosPorId(request, response) {
  const trabajo = request.params.id;

  connection.query(
    `SELECT * FROM trabajos WHERE id_trabajo = ?;`,
    [trabajo],
    (error, results) => {                           
      if (error) {
        console.error("Error al obtener el trabajo:", error);
        response.status(500).json({ error: "Error al obtener el dato:" });
      } else {
        response.status(200).json(results);
      }
    }
  );
}

module.exports = {
  verTrabajos,
  verTrabajosPorId,
};
