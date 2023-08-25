const express = require('express');
const { registerTeacher, loginTeacher, getAllTeachers } = require('../controllers/teacher.controller');
const { auth } = require('../services/authServices');


let router=express.Router()

router.post("/addteacher",registerTeacher)
router.post("/loginteacher",loginTeacher)
router.post("/getteachers",auth,getAllTeachers)

module.exports=router
