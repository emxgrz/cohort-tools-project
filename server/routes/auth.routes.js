const router = require("express").Router();
const User = require("../modules/User.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verifyToken = require("../middlewares/auth.middlewares")

// POST "/api/auth/signup" => recibe credenciales de usuario y lo crea en la DB
router.post("/signup", async (req, res, next) => {
  
  console.log(req.body)
  const { email, password, name } = req.body

  // Validaciones de backend
  // 1. Los campos son obligatorios
  if (!email || !password || !name) {
    res.status(400).json({message: "Todos los campos son requeridos"})
    return // esto detiene la funcion. Actuando como clausula de guardia.
  }

  // 2. la contraseña deberia ser lo suficientemente fuerte
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm
  if (!regexPassword.test(password)) {
    res.status(400).json({message: "La contraseña debe tener al menos, una mayuscula, una minuscula, un numero y entre 8 y 16 caracteres"})
    return // esto detiene la funcion. Actuando como clausula de guardia.
  }

  // 3. el email debe tener un estructura correcta // pendiente si quieren hacerla en el proyecto
  
  try {

    // 4. No haya otro usuario con el mismo email // todo
    const foundUser = await User.findOne({email: email})
    if (foundUser) {
      res.status(400).json({message: "Usuario ya registrado con ese email"})
      return // esto detiene la funcion. Actuando como clausula de guardia.
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    
    await User.create({
      email,
      password: hashPassword,
      name
    })

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }

})

// POST "/api/auth/login" => recibe credenciales de usario y lo autentica. Envia Token (llave virtual)
router.post("/login", async (req, res, next) => {

  const { email, password } = req.body
  console.log(email, password)


  if (!email || !password) {
    res.status(400).json({message: "Todos los campos son requeridos"})
    return 
  }

  try {
    
    
    const foundUser = await User.findOne({email: email})
    console.log(foundUser)
    if (!foundUser) {
      res.status(400).json({message: "Usuario no encontrado con ese email"})
      return 
    }

    
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password )
    if (!isPasswordCorrect) {
      res.status(400).json({message: "Contraseña no es correcta"})
      return 
    }

    
    const payload = {
      _id: foundUser._id,
      email: foundUser.email
    
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d" 
    })
    
    res.status(200).json({ authToken: authToken })
    
  } catch (error) {
    next(error)
  }
})



router.get("/verify", verifyToken, (req, res) => {
  console.log(req.payload)
  res.status(200).json(req.payload)
})

  //llamadas privadas
router.get("/user/:userId", verifyToken, (req, res) => {
   res.json({message: "aqui tienes tu información privada"})
})



module.exports = router