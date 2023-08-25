let Teacher=require("../models/teacher.model");
const bcryptjs = require('bcryptjs')
const nodemailer=require('nodemailer');
const { invitationMail } = require("../helpers/mailHelper");


let registerTeacher=async(req,res,next)=>
{
    try{
        let{name,email,password}=req.body;

        let salt=await bcryptjs.genSalt(11);
        let hashedPassword=await bcryptjs.hash(password,salt)

        //! returns the document if condition satisfies else returns null
        let isTeacherAvailable=await Teacher.findOne({email})

        if(!isTeacherAvailable)
        {

            //Emailcode
            invitationMail({email,name})

            let teacher=await Teacher.create({name,email,password:hashedPassword})

            return res.status(201).json({error:false,message:"Teacher Added Successfully",
        data:{name:teacher.name,email:teacher.email}})
        }
        res.status(409).json({error:true,message:"Teacher Already Exist"})
    }
    catch(err)
    {
        next(err)
    }
}

let loginTeacher=async(req,res,next)=>
{
    try
    {
        let {email,password}=req.body

        let isTeacherAvailable=await Teacher.findOne({email})

        if(!isTeacherAvailable)
        {
            return res.status(404).json({error:true,message:"No Teacher Found with Given Mail Id"})
        }

        // let hashedPassword=await bcryptjs.compare(password,isTeacherAvailable.password)
        let hashedPassword=await isTeacherAvailable.compareMyPassword(password)


        // if(isTeacherAvailable.password===password)
        if(hashedPassword)
        {
            let token=jwt.sign({email:isTeacherAvailable.email,name:isTeacherAvailable.name},rr123,{expiresIn:"1m"})
            console.log(token);
            return res.status(201).json({error:false,message:"Login Successfull",token})
        }
        else{
            return res.status(401).json({error:true,message:"Invalid Password"})
        }
    }
    catch(err)
    {
        next(err)
    }
}

let getAllTeachers=async(req,res,next)=>{
    try{

        //! if there is token it returns a token prefixed with bearer else returns undefined
        let authToken=req.headers.authorization;
        // console.log(authToken)

        if(!authToken ||  !authToken.startsWith("Bearer"))
        {
            return res.status(500).json({error:true,message:"Token Required"})
        }

        //! getting the token without Bearer
        let token=authToken.split(" ")[1];

        let data=jwt.verify(token,"rash123")
        console.log(data);

        let teachers=await Teacher.find({},{_id:0})
        return res.status(200).json({error:false,message:"Teachers Fetched Successfully",data:teachers,user:req.data.name})

    }
    catch(err)
    {
        next(err)
    }
}
module.exports={
    registerTeacher,
    loginTeacher,
    getAllTeachers
}



