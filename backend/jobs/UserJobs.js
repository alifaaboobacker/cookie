const User = require('../models/User');

exports.addUser = async (name,email)=>{
    try{
        let user = await User.findOne({email});
        if(user){
           return user;
        }
        user = new User({name,email});
        await user.save();
        return user;
    }
    catch(error){
        throw new Error("Failed to add new user");
    }
}
exports.fetchDetails = async (id)=>{
    try{
        const user = await User.findById(id).populate("score");
        if(!user){
            throw new Error("Invalid user");
        }
        return user;
    }catch(err){
        throw new Error("Failed to fetch details");
    }
}