require("dotenv").config()

//connexion a MongoDB
require("./db")

const express = require("express");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// configuraciones del servidor
const config = require("./config")
config(app)

//gestor rutas
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

//gestor errores
const errorHandling = require("./error-handlers")
errorHandling(app)


// START SERVER
const PORT = process.env.PORT || 5005
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});