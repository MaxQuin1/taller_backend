const { json } = require("express");
const connection = require("../database");

function crearTrabajo(request, response) {
  const nombre = request.body.nombre;
  const descripcion = request.body.descripcion;
  const trabajo = request.body.trabajo;

  connection.query(
    `INSERT INTO trabajos(nombre, descripcion, tipo_trabajo_id)
    VALUES (?,?,?);`,
    [nombre, descripcion, trabajo],
    (error, results) => {
      if (error) {
        console.error("Error al ejecutar:", error);
        response.status(500).json({ error: "Error al crear el trabajo" });
      } else {
        response.status(200).json(results);
      }
    }
  );
}

function verTrabajos(request, response) {
  connection.query(
    `SELECT trabajos.id_trabajo,
    trabajos.nombre,
    trabajos.descripcion,
    trabajos.horas,
    trabajos.estatus,
    tipo_trabajo.tipo,
    trabajos.fecha_creacion,
    trabajos.fecha_final
    FROM trabajos
    INNER JOIN tipo_trabajo ON trabajos.tipo_trabajo_id = tipo_trabajo.id_tipo_trabajo;
  `,
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

function editarTrabajo(request, response) {
  const id = request.params.id;
  const nombre = request.body.nombre;
  const descripcion = request.body.descripcion;
  const horas = request.body.horas;

  connection.query(
    `UPDATE trabajos
     SET nombre = ?, descripcion = ?, horas = horas + ?
     WHERE id_trabajo = ?`,
    [nombre, descripcion, horas, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el trabajo:", error);
        response.status(500).json({ error: "Error" });
      } else {
        console.log("Trabajo actualizado:", results);
        response.status(200).json(results);
      }
    }
  );
}

module.exports = {
  crearTrabajo,
  verTrabajos,
  verTrabajosPorId,
  editarTrabajo,
};
