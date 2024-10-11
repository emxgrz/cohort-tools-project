require("dotenv").config()

//connexion a MongoDB
require("./db")

const express = require("express");
const PORT = process.env.PORT || 5005

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(express.json());

//gestor rutas
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

//gestor errores
const errorHandling = require("./error-handlers")
errorHandling(app)


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});