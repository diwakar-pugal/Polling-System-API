// Importing dotenv
import './dotenv.js'

// Imports
import express from 'express';
import connectUsingMongoose from './config/mongooseConfig.js';

// Routers imported
import questionRouter from './src/features/question/routes/question.routes.js';
import optionRouter from './src/features/option/routes/option.routes.js';
import ApplicationError from './src/Middlewares/ApplicationError.js';
import mongoose from 'mongoose';

// Creating server
const app = express();

// Parsing data middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Default route
app.get('/', (req,res,next)=>{
    res.send("Welcome to Polling System API! Go to Postman to test the API.");
});

// Routes
app.use('/api/questions', questionRouter);
app.use('/api/options', optionRouter);

// Wrong routes
app.use((req,res,next)=>{
    res.status(404).send("This route does not exist please enter correct route.");
});

// Error handler
app.use((err, req, res, next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError)
    {
        return res.status(400).json({
            success: "false",
            error: err.message
        });
    }
    if(err instanceof ApplicationError)
    {
        return res.status(err.statusCode || 500).json({
            success: "false",
            error: err.message
        });
    }
    res.status(500).json({
        success: "false",
        error: "Something went wrong."
    });
});

// Server listening.
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is listening on localhost: ${PORT}`);
    connectUsingMongoose();
})