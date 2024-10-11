const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  // .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .then(() => {console.log("conectados a la DB. Todo ok!")})
  .catch((err) => console.error("Error connecting to MongoDB", err));
