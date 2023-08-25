const express = require('express');
const { createStudent, getStudents, getOneStudent, editStudent, deleteStudent } = require('../controllers/student.controller');
const { auth } = require('../services/authServices');



let router=express.Router();

router.post('/addstudents',createStudent)
router.get('/getstudents',getStudents)
router.get('/getsinglestudent/:sid',getOneStudent)
router.get('/updatedstudents',auth,editStudent)
router.get('/deletestudents',deleteStudent)



module.exports=router

