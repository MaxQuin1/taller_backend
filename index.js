const express = require("express");
const cors = require("cors");

const trabajos = require('./routers/trabajosRouter')
const mecanicos = require('./routers/mecanicosRouter')

const app = express();
app.use(express.json());
app.use(cors());

app.use("/trabajos", trabajos);
app.use("/mecanicos", mecanicos);

app.listen(8082, () => {
  console.log("servidor iniciando...");
});
