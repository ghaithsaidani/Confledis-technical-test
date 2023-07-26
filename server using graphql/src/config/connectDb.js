import mongoose from "mongoose";

let connectDb = async() => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("database connected successfully")
    } catch (error) {
        console.log(error.message);
    }
};

export default connectDb;