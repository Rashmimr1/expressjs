// const mongoose = require('mongoose');

const{Schema,model}=require('mongoose')
const bcryptjs=require('bcryptjs');
const { genSalt, compare } = require('bcryptjs');

let teacherSchema=new Schema(
    {
        name:
        {
            type:String,
            // required:true
            required:[true,"Name is Mandatory"]
            // minLength:[4,"Name Should contain atleast 4 Characters"],
            // maxLength:[10,"Name should contain only 10 characters"] 
        },
        email:{
            type:String,
            required:[true,"Email is Mandatory"],
        },
        password:{
            type:String,
            required:[true,"Password is Mandatory"],

        }
    },
    {timestamps:true}
)

//!Don't use arrow function for pre method
teacherSchema.pre("save",async function(next)
{
    let salt=await bcryptjs/genSalt(11)
    this.password=await bcryptjs.hash(this.password,salt)
    //! from 5 and above version of mongoose next() is not required
    //next()
})

teacherSchema.methods,compareMyPassword=async function(password)
{
    let hashedPassword=await bcryptjs.compare(password,this.password)

    return hashedPassword
}


//! creating collection
module.exports=new model("teacher",teacherSchema)
