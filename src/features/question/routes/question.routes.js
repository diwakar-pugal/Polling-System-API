// All questions routes is here.
// Imports
import express from 'express';
import { deleteQuestionById, getQuestion, postAddOption, postAddQuestion } from '../controller/question.controller.js';

// Create router
const questionRouter = express.Router();

// Routes
questionRouter.post('/create', postAddQuestion);
questionRouter.post('/:id/options/create', postAddOption);
questionRouter.delete('/:id/delete', deleteQuestionById);
questionRouter.get('/:id', getQuestion);

// Export route
export default questionRouter;