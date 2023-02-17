const mongoose = require("mongoose")
const Project = require("../models/projectModel")

//get all projects
const getProjects = async(req,res) => {
    //user_id for having different projects
    const user_id = req.user._id
    const projects = await Project.find({user_id}).sort({createdAt: -1})
    res.status(200).json(projects)
}
//create a new project
const createProject = async(req,res) => {
    const{name,description} = req.body

    //for error handling
    let emptyFields = []
    if(!name) {
        emptyFields.push("name")
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill the title", emptyFields})
    }

    try {
        //user id for having different projects
        const user_id = req.user._id
        const project = await Project.create({name,description,user_id})
        res.status(200).json(project)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
   
}
//update a project
const updateProject = async(req,res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Project not found"})
    }
    const project = await Project.findOneAndUpdate({_id: id},{...req.body})
        
    if(!project) {
       return res.status(404).json({error: "Project not found"})
    }
    res.status(200).json(project)
}
//delete a project
const deleteProject = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Project not found"})
    }
    const project = await Project.findOneAndDelete({_id: id})
    if(!project) {
        return res.status(404).json({error: "Project not found"})
    }
    res.status(200).json(project)
}

module.exports = {getProjects,createProject,updateProject,deleteProject}