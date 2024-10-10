const cors = require("cors")
const logger = require("morgan");
const cookieParser = require("cookie-parser");

function configs(app) {

  // all middlewares & configurations here
  app.use(logger("dev"));
  app.use(express.static("public"));
  app.use(cookieParser());
  // to allow CORS access from anywhere
  app.use(cors({
    // origin: '*' // cualquier programa puede contactar a mi servidor. Tiene sentido si creamos una API publica.
    origin: [process.env.ORIGIN]
  }));

  // below two configurations will help express routes at correctly receiving data. 
  app.use(express.json()); // recognize an incoming Request Object as a JSON Object
  app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array

}

module.exports = configs