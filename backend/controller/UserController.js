const userJobs = require('../jobs/UserJobs');

exports.addUserController= async (req,res)=>{
    try{
        const {name,email}=req.body;
        if(!name,!email){
            return res.status(401).json({success:false,message:"name and email not found"});
        }
        const user = await userJobs.addUser(name,email);
        return res.status(201).json({success:true,message:"user created",user});
    }catch(err){
        return res.status(500).json({success:false,message:err});
    }
};
exports.getUserDetailsController = async (req,res)=>{
    try{
    const id = req.params.id;
    if(!id){
        return res.staus(404).json({success:false,message:"id not found"});
    }
    const user = await userJobs.fetchDetails(id);
    return res.status(200).json({success:true,user});
    }catch(err){
        return res.staus(500).json({success:false,message:err});
    }
};