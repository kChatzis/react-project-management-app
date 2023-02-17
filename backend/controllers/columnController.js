const mongoose = require("mongoose")
const Column = require("../models/columnModel")



const getColumns = async(req,res) => {
        const columns = await Column.find().populate("tasks");
        res.status(200).json(columns)
}

const createColumn = async(req,res) => {
    const{title,tasks} = req.body
    
    try {
        const column = await Column.create({title,tasks})
        res.status(200).json(column)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
   
}


const updateColumn = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Column not found"})
    }
    const column = await Column.findOneAndUpdate({_id: id},{...req.body})

    if(!column) {
        return res.status(404).json({error: "Column not found"})
     }
     res.status(200).json(column)

}





const deleteColumn = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Column not found"})
    }
    const column = await Column.findOneAndDelete({_id: id})
    if(!column) {
        return res.status(404).json({error: "Column not found"})
    }
    res.status(200).json(column)

}


const updateColumnOrder = async(req,res) => {
    try {
      const columns = req.body.columns;
      for (let i = 0; i < columns.length; i++) {
        const column = await Column.findById(columns[i]._id);
        column.order = i;
        await column.save();
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error);
    }
  }
module.exports = {getColumns,createColumn,updateColumn,deleteColumn,updateColumnOrder}