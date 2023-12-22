// All routes of options are here.
// Imports
import express from 'express';
import { addVoteToOption, deleteOption } from '../controller/option.controller.js';

// Create route
const optionRouter = express.Router();

// Routes
optionRouter.delete('/:id/delete', deleteOption);
optionRouter.get('/:id/add_vote', addVoteToOption);

// Export route
export default optionRouter;