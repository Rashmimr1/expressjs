const {connect} = require('mongoose')
require('dotenv').config()

//! creating database  and connecting to it

connect(process.env.DEV_MONGOURL).
then(()=>{
    console.log("Mongo db Connected Successfully");
}
).catch(err=>
    {
        console.log(err);
    }
)
