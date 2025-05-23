const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB!!!")
    }catch (err){
        console.log(err?.message);
        process.exit(1);
    }
}

module.exports = connectDB