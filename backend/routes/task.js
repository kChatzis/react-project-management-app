const express = require("express")
const router = express.Router()
const {getTasks,createTask,updateTask,deleteTask, updateTaskColumn, updateTaskOrder} = require("../controllers/taskController")

router.get("/",getTasks)

router.post("/",createTask)

router.patch("/order",updateTaskOrder)


router.patch("/:id",updateTask)

router.delete("/:id",deleteTask)


router.patch("/:id/column",updateTaskColumn)

module.exports = router