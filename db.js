const mongoose = require('mongoose');

const connectDB= async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017");
        console.log("MongoDB connected successfully");
    }catch(error){
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;





// const mongoose = require('mongoose');

// const connectDB = async()=>{
//     try{
//         await mongoose.connect('mongodb://localhost:27017');
//         console.log("MongoDB connected");
//     }catch(error){
//         console.error(error);
//         process.exit(1);
//     }
// }

// module.exports = connectDB;