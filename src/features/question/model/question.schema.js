// Question schema is created here and its model.
// Imports
import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Option'
        }
    ]
});

// Question model
const QuestionModel = mongoose.model('Question', questionsSchema);
export default QuestionModel;