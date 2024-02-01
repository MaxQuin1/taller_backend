const { json } = require("express");
const connection = require("../database");

function verTipoTrabajo(request, response) {
  connection.query(`SELECT * FROM tipo_trabajo`, (error, results) => {
    if (error) {
      console.error("Error al obtener los tipos de trabajos:", error);
      response.status(500).json({ error: "Error al obtener los datos" });
    } else {
      response.status(200).json(results);
    }
  });
}

function verTipoTrabajoPorId(request, response) {
  const tipo_trabajo = request.params.id;

  connection.query(
    `SELECT * FROM tipo_trabajo WHERE id_tipo_trabajo = ?;`,
    [tipo_trabajo],
    (error, results) => {                           
      if (error) {
        console.error("Error al obtener el tipo de trabajo:", error);
        response.status(500).json({ error: "Error al obtener el dato:" });
      } else {
        response.status(200).json(results);
      }
    }
  );
}

module.exports = {
  verTipoTrabajo,
  verTipoTrabajoPorId,
};
