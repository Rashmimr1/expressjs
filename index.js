const express = require('express');
require ('dotenv').config()
let studentRoutes=require('./routes/student.route')
let teacherRoutes=require('./routes/teacher.route')
let userRoutes=require('./routes/user.route')
require ("./adapters/connectionDb.js")


let app=express()


//! It is used to accept json data from the req body
app.use(express.json())


// student Routes
app.use('/api/student',studentRoutes)

// Teacher Routes
app.use('/api/teacher',teacherRoutes)

// User Routes
app.use('/api/user',userRoutes)



//! Page Not Found Middleware
app.use("*",(req,res,next)=>{
    res.status(404).json({error:true,message:"Page not Found"})
})


//! Error Handling Middleware

app.use((err,req,res,next)=>
{
    res.status(400).json({error:true,message:err.message,data:"OK"})
})



 let PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})

// let PORT=process.env.DEVPORT
// app.listen(PORT, (err)=>
// {
//     if(err) throw err
//     console.log(`Server is running on PORT ${PORT}`);
// })



