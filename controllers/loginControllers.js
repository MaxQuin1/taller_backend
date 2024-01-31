const { json } = require("express");
const connection = require("../database");

function login(request, response) {
  const correo = request.body.correo;
  const contraseña = request.body.contraseña;

  connection.query(
    `SELECT * FROM mecanicos WHERE correo = ? AND contraseña = ?`,
    [correo, contraseña],
    (error, result) => {
      if (result.length === 0) {
        response.status(200).json({
          respuesta: "no se encontro usuario",
          status: false,
        });
      } else {
        const userIndex = result.findIndex(user => user !== null && user !== undefined);
        
        if (userIndex !== -1) {
          response.status(200).json({
            respuesta: "usuario encontrado",
            status: true,
          })
        } else {
          response.status(200).json({
            respuesta: "no se encontro usuario válido",
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
