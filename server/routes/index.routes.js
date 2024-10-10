const express = require("express");
const router = express.Router()

router.get("/", (req, res, next) => {
  console.log("llegó la llamada")
  res.status(200).json({ message: "smaili" })
})

const cohortRouter = require("./cohort.routes.js")
router.use("/cohort", cohortRouter)

const studentRouter = require("./student.routes.js")
router.use("/student", studentRouter)

module.exports = router