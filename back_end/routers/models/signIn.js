const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    }

})
const User = mongoose.model('User',userSchema)
module.exports = User