const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
const projectRoutes = require("./routes/project")
const columnRoutes = require("./routes/column")
const taskRoutes = require("./routes/task")


const app = express();
//important
app.use(express.json())
// use of routes
app.use("/api/user",userRoutes)

app.use("/api/project",projectRoutes)

app.use("/api/column",columnRoutes)

app.use("/api/task",taskRoutes)

//connection to db 
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(process.env.PORT,()=> {
        console.log("connected to db & listening on ",process.env.PORT)
    })
})
.catch((error)=> {
    console.log(error);
})