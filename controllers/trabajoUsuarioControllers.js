const { json } = require("express");
const connection = require("../database");

function verTrabajosPorIdUsuario(request, response) {
  const usuario = request.params.id;

  connection.query(
    `SELECT * FROM trabajos WHERE usuario_id = ?;`,
    [usuario],
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
    verTrabajosPorIdUsuario,
};
