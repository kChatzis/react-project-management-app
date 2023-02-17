const mongoose = require("mongoose")
const Task = require("../models/taskModel")
const Column = require("../models/columnModel")

const getTasks = async(req,res) => {
        const tasks = await Task.find();
        res.status(200).json(tasks)
}

const createTask = async(req,res) => {
    const{title,description,column} = req.body
    
    try {
        const task = await Task.create({title,description,column})
        res.status(200).json(task)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
   
}


const updateTask = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Task not found"})
    }
    const task = await Task.findOneAndUpdate({_id: id},{...req.body})

    if(!task) {
        return res.status(404).json({error: "Task not found"})
     }
     res.status(200).json(task)

}


const deleteTask = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Task not found"})
    }
    const task = await Task.findOneAndDelete({_id: id})
    if(!task) {
        return res.status(404).json({error: "Task not found"})
    }
    res.status(200).json(task)

}

const updateTaskColumn = async(req,res) => {
  const {id} = req.params
  const { oldColumnId, newColumnId } = req.body;
  
  try {
    // Find the task and update its column
    const task = await Task.findByIdAndUpdate(id, { column: newColumnId }, { new: true });
    // Find the old column and remove the task
    await Column.findByIdAndUpdate(oldColumnId, { $pull: { tasks:  id}  });

    // Find the new column and add the task
    await Column.findByIdAndUpdate(newColumnId, { $push: { tasks:  id } });
    
    res.json({ message: 'Task column updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task column' });
  }
}
    
  

const updateTaskOrder = async(req,res) => {
    {
        try {
          const { tasks } = req.body;
          for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            await Task.updateOne({ _id: task._id }, { $set: { order: i } });
          }
         
          res.status(200).send('Task order updated');
        } catch (error) {
          res.status(500).send('Server error');
        }
      }
}

module.exports = {getTasks,createTask,updateTask,updateTaskOrder,updateTaskColumn,deleteTask}