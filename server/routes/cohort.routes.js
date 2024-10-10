const express = require("express");
const router = express.Router()

const Cohort = require("../modules/Cohort")

//crear un cohort

router.post("/", async (req, res,next) => {
    try {
      const response = await Cohort.create({
        inProgress: req.body.inProgress,
        cohortSlug: req.body.cohortSlug,
        cohortName: req.body.cohortName,
        program: req.body.program,
        campus: req.body.campus,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        programManager: req.body.programManager,
        leadTeacher: req.body.leadTeacher,
        totalHours: req.body.totalHours,
      });
  
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  //leer todos los cohort
  
  router.get("/", async (req, res,next) => {
    try {
      const allCohort = await Cohort.find();
  
      res.status(200).json(allCohort);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  // leer un cohorts
  
  router.get("/:id", async (req, res,next) => {
    try {
      const cohort = await Cohort.findById(req.params.id);
      res.status(200).json(cohort);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  // actualizar un cohort
  router.put(":id", async (req, res,next) => {
    try {
      const updateCohorts = await Cohort.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      res.status(200).json(updateCohorts);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  //eliminar un cohort
  router.delete("/:id", async (req, res, next) => {
    try {
      const response = await Cohort.findByIdAndDelete(req.params.id);
  
      res.status(204).send();
    } catch (error) {
      console.log(error);
      next (error);
    }
  });
  module.exports = router