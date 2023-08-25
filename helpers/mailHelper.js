const nodemailer=require('nodemailer')


// let invitationMail=async(email,name)=>
// {
//     let transporter=nodemailer.createTransport({
//         service:"Gmail",
//         auth:{
//             user:"rashmimrr1@gmail.com",
//             pass:"nodowertqhytynra"
//         }
//     })
let transporter=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:"rashmimrr1@gmail.com",
            pass:"nodowertqhytynra"
        }})
        let invitationMail=async(email,name)=>
{
    let mailOptions={
        from:"rashmimrr1@gmail.com",
        to:email,
        subject:"Invitation Mail",
        text:"Thanks for registering with us",
        html:`<h1> Thanks for Registering ${name} Visit Again</h1>`
    }
    transporter.sendMail(mailOptions,()=>{console.log("Mail Sent SUccessfully");})
}

let sendOtp=async(email,otp,name)=>{
    let mailOptions={
        from:"rashmimrr1@gmail.com",
        to:email,
        subject:"OTP Mail",
        html:`<h1> Hi ${name}, Your OTP for XYZ Application is ${otp}</h1>`
    }
    transporter.sendMail(mailOptions,()=>{
        console.log("Otp Sent Successfully");
    })
}

 module.exports={
    invitationMail,
    sendOtp
 }