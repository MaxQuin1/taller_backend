const { json } = require("express");
const connection = require("../database");

function crearMecanico(request, response) {
  const nombre = request.body.nombre;
  const correo = request.body.correo;
  const contraseña = request.body.contraseña;

  connection.query(
    `INSERT INTO mecanicos(nombre, correo, contraseña)
    VALUES (?,?,?);`,
    [nombre, correo, contraseña],
    (error, results) => {
      if (error) {
        console.error("Error al ejecutar:", error);
        response.status(500).json({ error: "Error al crear el mecanico" });
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
    `SELECT * FROM mecanicos WHERE id_mecanico = ?;`,
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

const eliminarMecanico = (req,res) => {
  const mecanico = req.params.id;

  connection.query('DELETE FROM mecanicos WHERE id_mecanico = ?',[mecanico],(error) => {
      console.error("Error la receta el producto".error);
      if (error){
          console.error("Error al eliminar al mecanico",error);
          res.status(500).json({error :"Ocurrio un error al eliminar al mecanico"});
      }else{
          res.json({message:"El mecanico fue elimanado correctamente"});
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
