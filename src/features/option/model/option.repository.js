// Options repository is here all database activity related functions are here.
// Imports
import ApplicationError from "../../../Middlewares/ApplicationError.js";
import OptionModel from "./option.schema.js";

// Function to delete a option from database.
export const deleteOptionById = async(id)=>{
    try {
        const option = await OptionModel.findById(id);
        if(!option)
        {
            throw new ApplicationError("No option found by this id", 404);
        }
        if(option.votes > 0)
        {
            throw new ApplicationError("Cannot delete this option there is votes on it that's why.", 400);
        }
        return await OptionModel.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

// Function to add a vote to a option in the database.
export const addVote = async(id)=>{
    try {
        const option = await OptionModel.findById(id);
        if (!option) {
            throw new ApplicationError('Option not found by this id', 400);
        }
        option.votes++;
        return await option.save();
    } catch (error) {
        throw error;
    }
}