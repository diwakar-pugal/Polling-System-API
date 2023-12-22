//  Question repository file his here all database activity functions are here.
// Imports
import { ObjectId } from "mongodb";
import QuestionModel from "../../question/model/question.schema.js";
import OptionModel from "../../option/model/option.schema.js";
import ApplicationError from "../../../Middlewares/ApplicationError.js";

// Function to create a new question in database.
export const add = async(title)=>{
    try {
        const newQuestion = new QuestionModel(title);
        return await newQuestion.save();
    } catch (error) {
        throw error;
    }
}

// Function to create a new option in database to a specific question here now.
export const addOption = async(text, id)=>{
    try {
        const PORT = process.env.PORT;
        const question = await QuestionModel.findById(id);
        if(!question)
        {
            throw new ApplicationError("No question exist by this id.", 404);
        }
        const newOption = new OptionModel({
            text: text,
            question: new ObjectId(id),
            link_to_vote: `http://localhost:${PORT}/api/options/${id}/add_vote`
        });
        const savedOption = await newOption.save();
        const optionId = savedOption._id; // Capturing the ID of the saved option

        // Constructing the link_to_vote with the captured optionId
        const link_to_vote = `http://localhost:${PORT}/api/options/${optionId}/add_vote`;
        
        // Updating the saved option with the constructed link_to_vote
        const updatedOption = await OptionModel.findByIdAndUpdate(optionId, { link_to_vote }, {
            new: true
        });

        // Updating to question options array.
        await QuestionModel.findByIdAndUpdate(id, {
            $push: { options: optionId}
        });
        return updatedOption;
    } catch (error) {
        throw error;
    }
}

// Function to delete a specfic question from database by id.
export const deleteQuestion = async (id) => {
    try {
        const question = await QuestionModel.findById(id);
        if (!question) {
            throw new ApplicationError("No question found by this id.", 404);
        }

        const options = await OptionModel.find({ question: id });
        const isOptionHasVotes = options.some((option) => option.votes > 0);

        if (isOptionHasVotes) {
            throw new ApplicationError(
                "Question cannot be deleted because its options have votes.",
                400
            );
        } else {
            // Delete associated options first
            await OptionModel.deleteMany({ question: new ObjectId(id) });

            // Then delete the question
            return await QuestionModel.findByIdAndDelete(id);
        }
    } catch (error) {
        throw error;
    }
};


// Function to get  a specific question from database by id.
export const findQuestion = async(id)=>{
    try {
        const question = await QuestionModel.findById(id).populate('options');
        if(!question)
        {
            throw new ApplicationError("Question not found by this id.", 404);
        }
        return question;
    } catch (error) {
        throw error;
    }
    
}