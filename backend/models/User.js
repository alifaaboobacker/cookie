const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    score:{
        type:mongoose.Schema.ObjectId,
        ref:'Score'
    }

},{timestamps:true});

module.exports=mongoose.model('User',userSchema);