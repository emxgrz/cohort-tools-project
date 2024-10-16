const express = require("express");
const router = express.Router()
const verifyToken = require("../middlewares/auth.middlewares")
const User = require("../modules/User.model")

router.get("/", verifyToken ,async (req, res, next) => {
  try {
  const user = await User.findById(req.payload._id)
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.status(200).json(user)

  } catch (error) {
   next(error)
   }
})

  
module.exports = router