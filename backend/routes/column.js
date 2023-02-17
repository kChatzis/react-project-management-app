const express = require("express")
const router = express.Router()
const {getColumns,createColumn,updateColumn,deleteColumn,updateColumnOrder} = require ("../controllers/columnController")

//get Columns
router.get("/",getColumns)

//post a new Column
router.post("/",createColumn)

//update the order
router.patch("/order",updateColumnOrder)

//update a Column
router.patch("/:id",updateColumn)

//delete a Column
router.delete("/:id",deleteColumn)

module.exports = router