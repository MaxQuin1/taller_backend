const { json } = require("express");
const connection = require("../database");
const crypto = require('crypto');

function hashPassword(password) {
    const hash = crypto.createHash('md5');
    hash.update(password);
    return hash.digest('hex');
}

function crearMecanico(request, response) {
    const { nombre, correo, contraseña, codigo } = request.body;
    const hashedPassword = hashPassword(contraseña); 
    connection.query(
        `INSERT INTO mecanicos(nombre, correo, contraseña, codigo)
        VALUES (?,?,?,?);`,
        [nombre, correo, hashedPassword, codigo],
        (error, results) => {
            if (error) {
                console.error("Error al ejecutar:", error);
                response.status(500).json({ error: "Error al crear el mecánico" });
            } else {
                response.status(200).json(results);
            }
        }
    );
}

function verMecanicos(request, response) {
  connection.query(`SELECT * FROM mecanicos`, (error, results) => {
    if (error) {
      console.error("Error al obtener los mecanicos:", error);
      response.status(500).json({ error: "Error al obtener los mecanicos" });
    } else {
      response.status(200).json(results);
    }
  });
}

function verMecanicosPorId(request, response) {
  const mecanico = request.params.id;

  connection.query(
    `SELECT * FROM usuarios WHERE id_usuario = ?;`,
    [mecanico],
    (error, results) => {
      if (error) {
        console.error("Error al obtener el mecanico:", error);
        response.status(500).json({ error: "Error al obtener el mecanico:" });
      } else {
        response.status(200).json(results);
      }
    }
  );
}

function editarMecanico(request, response) {
  const id = request.params.id;
  const { nombre, correo, contraseña } = request.body;

  connection.query(
    `UPDATE usuarios
     SET nombre = ?, correo = ?, contraseña = ?
     WHERE id_usuario = ?`,
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

const eliminarMecanico = (req, res) => {
  const mecanico = req.params.id;

  connection.query('DELETE FROM mecanicos WHERE id_mecanico = ?',[mecanico],(error, results) => {
      if (error){
          console.error("Error al eliminar al mecanico", error);
          res.status(500).json({ error: "Ocurrió un error al eliminar al mecanico" });
      } else {
          if (results.affectedRows > 0) {
            res.json({ message: "El mecanico fue eliminado correctamente" });
          } else {
            res.status(404).json({ error: "El mecanico no fue encontrado" });
          }
      }
  });
}

module.exports = {
  crearMecanico,
  verMecanicos,
  verMecanicosPorId,
  editarMecanico,
  eliminarMecanico,
};
