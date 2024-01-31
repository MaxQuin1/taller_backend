const express = require("express");
const cors = require("cors");

const trabajos = require('./routers/trabajosRouter')

const app = express();
app.use(express.json());
app.use(cors());

app.use("/trabajos", trabajos);

app.listen(8082, () => {
  console.log("servidor iniciando...");
});
