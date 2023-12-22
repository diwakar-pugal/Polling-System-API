// Connecting to databse mongodb using mongoose.
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Url string of the database.
const url = process.env.MONGO_DB;

const connectUsingMongoose = async()=>{
    try {
        mongoose.connect(url, {
            family: 4
        });

        console.log("Mongodb connected.");
    } catch (error) {
        console.log("Error while connecting to the databse mongodb.");
    }
}

export default connectUsingMongoose;