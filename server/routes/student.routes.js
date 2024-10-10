const express = require("express");
const router = express.Router()

const Student = require("../modules/Student")


router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find({})
    .populate("cohort");
    console.log("Retrieved students ->", students);
        res.json(students);
  } catch (error) {
    console.error("Error while retrieving students ->", error);
    next(error)
  }  
});


router.post("/", async (req,res,next) => {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages, 
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects,
      cohort: req.body.cohort  
    })
    res.json(newStudent)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get("/cohort/:cohortId", async (req,res,next) => {
  const {cohortId} = req.params
  try {
    const students = await Student.find({cohort:cohortId})
    .populate("cohort")
    res.send(students)
    if (cohortId.length === 0) {
      return ("No cohort mach the description")
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})


router.get("/:studentId", async (req,res,next) => {
  try {
    const estudiante = await Student.findById(req.params.studentId)
    .populate("cohort")
    res.send(estudiante)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.put("/:studentId", async (req,res,next) => {
  try {
    const response = await Student.findByIdAndUpdate(req.params.studentId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages, 
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects,
      cohort: req.body.cohort  
    })
    res.json("response:", response)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.delete("/:studentId", async (req,res,next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.json("student deleted")
  } catch (error) {
    console.log(error)
    next(error)
  }
})


module.exports = router