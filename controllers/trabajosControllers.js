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

function editarTrabajo(request, response) {
  const id = request.params.id
  const nombre = request.body.nombre
  const correo = request.body.correo
  const contraseña = request.body.contraseña
  
  connection.query(
    `UPDATE mecanicos
     SET nombre = ?, correo = ?, contraseña = ?
     WHERE id_mecanico = ?`,
    [nombre, correo, contraseña, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar al mecanico:", error);
        response.status(500).json({ error: "Error" });
      } else {
        console.log('Mecanico actualizado:', results);
        response.status(200).json(results);
      }
    }
  );  
}

module.exports = {
  crearTrabajo,
  verTrabajos,
  verTrabajosPorId,
};
