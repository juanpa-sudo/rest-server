require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// rutas
app.use(require("./routes/index"));

// Habilitar la carpeta public

app.use(express.static(path.resolve(__dirname, "../public")));

async function base() {
  const respuesta = await mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}

base();

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
