const express = require("express");
const router = express.Router()

router.get("/", (req, res, next) => {
  console.log("llegó la llamada")
  res.status(200).json({ message: "smaili" })
})

const cohortRouter = require("./cohort.routes.js")
router.use("/cohorts", cohortRouter)

const studentRouter = require("./student.routes.js")
router.use("/students", studentRouter)

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter =require("./users.routes.js")
router.use("/user", userRouter)

module.exports = router