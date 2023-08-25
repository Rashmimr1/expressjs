const mongoose = require('mongoose');


//! creation of Structure or schema for student collection

let studentSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            // required:true
            required:[true,"Name is Mandatory"],
            minLength:[4,"Name Should contain Atleast 4 Characters"],
            maxLength:[10,"Name should contain only 10 characters"]
        },
        age:
        {
            type:Number,
            required:true,
            min:[18,"Minimum age should be 18 and you entered {VALUE}"],
            max:[30,"Maximum age should be 30 and you entered {VALUE}"]
        },
        gender:{
            type:String,
            required:true,
            enum:{
                values:["male","female","others"],
                message:"Only male,female,others allowed and you entered {VALUE}"
            },
        },
        email:{
            type:String,
            required:true,
            unique:true
        }
    },
    {timestamps:true}
)
// {value msg}
            //{atomic structure}

//! creating collection
module.exports=new mongoose.model("student",studentSchema)