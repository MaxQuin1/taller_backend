const express = require("express");
const cors = require("cors");

const login = require('./routers/loginRouter')
const trabajos = require('./routers/trabajosRouter')
const trabajosEstatus = require('./routers/trabajosEstatusRouter')
const tiposTrabajo = require('./routers/tipoTrabajoRouter')
const mecanicos = require('./routers/mecanicosRouter')
const materiales = require('./routers/materialesRouter')
const transporter = require('./helpers/mailer')

const app = express();
app.use(express.json());
app.use(cors());

app.use("/login", login);
app.use("/trabajos", trabajos);
app.use("/trabajosEstatus", trabajosEstatus);
app.use("/tipoTrabajo", tiposTrabajo);
app.use("/mecanicos", mecanicos);
app.use("/materiales", materiales);

function generarCodigoRandom(longitud) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';
  for (let i = 0; i < longitud; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

app.post("/api/auth/login/:email/code", async function (req, res) {
  const { email } = req.params;
  const codigo = generarCodigoRandom(8);
  const result = await transporter.sendMail({
    from: "maximoquinteroescobar8@gmail.com",
    to: email,
    subject: "Código de inicio de sesión",
    text: `Este es tu código para iniciar sesión: ${codigo}`,
  });
  res.status(200).json({ ok: true, message: "Código enviado", codigo: codigo});
});

app.listen(8082, () => {
  console.log("servidor iniciando...");
});
