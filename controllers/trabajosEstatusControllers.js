const { json } = require("express");
const connection = require("../database");

function verTrabajosEnProceso(request, response) {
  connection.query(
    `SELECT * FROM trabajos WHERE estatus = 0`,
    (error, results) => {
      if (error) {
        console.error("Error al obtener los trabajos:", error);
        response.status(500).json({ error: "Error al obtener los datos" });
      } else {
        response.status(200).json(results);
      }
    }
  );
}

function verTrabajosTerminados(request, response) {
  connection.query(
    `SELECT * FROM trabajos WHERE estatus = 1`,
    (error, results) => {
      if (error) {
        console.error("Error al obtener los trabajos:", error);
        response.status(500).json({ error: "Error al obtener los datos" });
      } else {
        response.status(200).json(results);
      }
    }
  );
}

function terminarTrabajo(request, response) {
  const id = request.params.id;

  connection.query(
    `UPDATE trabajos
       SET estatus = 1
       WHERE id_trabajo = ?`,
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar al terminar trabajo:", error);
        response.status(500).json({ error: "Error" });
      } else {
        console.log("Trabajo terminado:", results);
        response.status(200).json(results);
      }
    }
  );
}

module.exports = {
  verTrabajosEnProceso,
  verTrabajosTerminados,
  terminarTrabajo,
};
