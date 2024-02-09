const { json } = require("express");
const connection = require("../database");

function login(request, response) {
  const correo = request.body.correo;
  const contraseña = request.body.contraseña;
  const codigo = request.body.codigo;

  connection.query(
    `SELECT * FROM usuarios WHERE correo = ? AND contraseña = ? AND codigo = ?`,
    [correo, contraseña, codigo],
    (error, result) => {
      if (error) {
        console.error(error);
        response.status(500).json({
          respuesta: "Error en la base de datos",
          status: false,
        });
        return;
      }
      if (result.length === 0) {
        response.status(200).json({
          respuesta: "No se encontró usuario",
          status: false,
        });
      } else {
        const user = result[0];
        if (user) {
          response.status(200).json({
            respuesta: "Usuario encontrado",
            status: true,
            tipo_usuario: user.tipo_usuario,
            nombre: user.nombre,
            id: user.id_usuario,
          });
        } else {
          response.status(200).json({
            respuesta: "No se encontró un usuario válido",
            status: false,
          });
        }
      }
    }
  );
}

module.exports = {
  login,
};
