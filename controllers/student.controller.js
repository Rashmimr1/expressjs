//! Collection
let Student = require('../models/student.model')
const Joi = require('joi');
const jwt = require('jsonwebtoken');


let studentSchema = Joi.object({
    name: Joi.string().min(4).required().messages({
        "string.base": "Name Must be String",
        "string.min": "Name Should Contain Minimum 4 characters",
        "string.empty": "Name is Mandatory"
    }),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    email: Joi.string().required().email()
})
//! Adding student

// let createStudent=async(req,res,next)=>{
//     let{name,age,gender,email}=req.body
//     console.log(req.body);
//     let addedStudent=await Student.create({name,age,gender,email})

//     res.status(201).json({error:false,message:"Student Added Successfully",data:addedStudent})
// }

// let createStudent=async(req,res,next)=>{
//     try
//     {
//         let{name,age,gender,email}=req.body
//             let addedStudent=await Student.create({name,age,gender,email})

//           res.status(201).json({error:false,message:"Student Added Successfully",data:addedStudent})
//     }
//     catch(err)
//     {
//         res.status(400).json({error:true,data:err.message})
//     }
// }

let createStudent = async (req, res, next) => {
    try {
        let { name, age, gender, email } = req.body
        let { value, error } = studentSchema.validate({ name, age, gender, email })

        console.log(value);
        console.log("-------------------------------");
        console.log(error);

        if (error) {
            return res.status(400).json({ error: true, message: "Validation Failed", err: error })

        }
        else {
            let student = await Student.create(value)
            res.status(201).json({ message: "Student Added Successfully", data: student })

        }
    }
    catch (err) {
        res.status(400).json({ error: true, data: err.message })

    }
}


//! getting All the Students

let getStudents = async (req, res, next) => {
    let allStudents = await Student.find()

    res.status(200).json({ error: false, message: "Students Fetched Successfully", data: allStudents })
}

//! getting one student

let getOneStudent = async (req, res, next) => {
    let { sid } = req.params

    console.log(sid);

    



    //! below methods return null if there no match else returns matched document
    // let singleStudent=await Student.findById(sid)
    // let singleStudent=await Student.findOne({name:sid})

    let singleStudent = await Student.findOne({ name: sid })
    // let singleStudent=await Student.findOne({_id:sid})


    // ! Checking whether student is available or not

    if (!singleStudent) {
        return res.status(404).json({ error: true, message: "No Student Found with Given Name", data: null })
    }

    return res.status(200).json({ error: false, data: singleStudent })
}

//! updated student

let editStudent = async (req, res, next) => {
    let { name, age, gender } = req.body
    let { sid } = req.body

    let authToken = req.headers.authorization
    console.log(authToken);
    if (!authToken || !authToken.startsWith('Bearer'))
    {
        return res.status(500).json({ error: true, message: "Token Required" })
    }

    //! getting the token without Bearer
    let token=authToken.split(" ")[1];

    let data=jwt.verify(token,"rash123")
    console.log(data);

    let singleStudent = await Student.findById(sid)

    //!  Checking whether student is available or not
    if (!singleStudent) {
        return res.status(404).json({ error: true, message: `No Student Found with Given ID ${sid}`, data: null })
    }
    // new  is used to display the updated value, otherwise it will display previous value or document
    // let updatedStudent=await Student.findOneAndUpdate({_id:sid},{name,age,gender},{new:true})
    let updatedStudent = await Student.findOneAndUpdate({ _id: sid }, { age }, { new: true, runValidators: true })


    // req.body accepts all the keys and values passed but it will ignore at  the time of execution or only  display the keys which we created a schema for them
    console.log(req.body);
    console.log(req.params);
    res.status(200).json({ error: false, message: `${updatedStudent.name.toUpperCase()} age Updated from  ${singleStudent.age} to ${updatedStudent.age} Successfully`, data: updatedStudent })
}

//! Deleting Single Student
let deleteStudent = async (req, res, next) => {

    //!sid is having _id
    let { sid } = req.params
    let isAvailable = await Student.findById(sid)

    if (isAvailable) {
        return res.status(404).json({ error: true, message: `No Student Found with Given Id ${sid},data:null` })
    }
    let deleteStudent = await Student.findOneAndDelete({ _id: sid })
    res.status(200).json({ error: false, message: `Student Deleted Successfully`, data: deleteStudent })
}


module.exports = {
    createStudent,
    getStudents,
    getOneStudent,
    editStudent,
    deleteStudent
}