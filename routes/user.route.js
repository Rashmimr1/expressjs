const express = require('express');
const { createUser, loginUser, userVerification } = require('../controllers/userController');


let router=express.Router()

router.post('/adduser',createUser)
router.post('/loginuser',loginUser)
router.post('/userverification',userVerification)

module.exports=router