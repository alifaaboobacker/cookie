const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
    console.log('Database is connected');
    }catch(err){
        console.log('Failed to connect db'+err);
        process.exit(1);
    }
};
module.exports = connectDb;