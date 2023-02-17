const express = require("express")
const router = express.Router()

const {getProjects,createProject,updateProject,deleteProject} = require("../controllers/projectController")
const requireAuth = require("../middleware/requireAuth")

// require auth for all workout routes
router.use(requireAuth)

//get all projects
router.get("/",getProjects)

//post a new project
router.post("/",createProject)

//update a project
router.patch("/:id",updateProject)

//delete a project
router.delete("/:id",deleteProject)

module.exports = router