const mongoose = require("mongoose");
const validator = require("validator");

const custSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]

    },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true

    },
    address: {
        type:String,
        required:true
    },
    


  
}).method("toJSON", function() {
    const {_id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })
//we will creat a new collection
module.exports = mongoose.model('Customer',custSchema)
//const Customer = new mongoose.model('customer', custSchema);

