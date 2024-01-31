const express = require("express");
const cors = require("cors");

const login = require('./routers/loginRouter')
const trabajos = require('./routers/trabajosRouter')
const mecanicos = require('./routers/mecanicosRouter')
const materiales = require('./routers/materialesRouter')

const app = express();
app.use(express.json());
app.use(cors());

app.use("/login", login);
app.use("/trabajos", trabajos);
app.use("/mecanicos", mecanicos);
app.use("/materiales", materiales);

app.listen(8082, () => {
  console.log("servidor iniciando...");
});
