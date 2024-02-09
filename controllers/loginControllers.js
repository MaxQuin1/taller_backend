const connection = require("../database");
const crypto = require('crypto');

function hashPassword(password) {
    const hash = crypto.createHash('md5');
    hash.update(password);
    return hash.digest('hex');
}

function login(request, response) {
    const { correo, contraseña, codigo } = request.body;
    const hashedPassword = hashPassword(contraseña); // Hash de la contraseña proporcionada

    connection.query(
        `SELECT * FROM usuarios 
        WHERE correo = ?
        AND contraseña = ? 
        AND codigo = ?`,
        [correo, hashedPassword, codigo],
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
                    respuesta: "No se encontró mecánico",
                    status: false,
                });
            } else {
                const mecanico = result[0];
                if (mecanico) {
                    response.status(200).json({
                        respuesta: "Mecánico encontrado",
                        status: true,
                        nombre: mecanico.nombre,
                        tipo_usuario: mecanico.tipo_usuario,
                        id: mecanico.id_usuario,
                    });
                } else {
                    response.status(200).json({
                        respuesta: "No se encontró un mecánico válido",
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
