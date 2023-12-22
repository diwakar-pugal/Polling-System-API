# Polling System API

## Description
- The Polling System API is a powerful platform designed to facilitate voting processes for questions and options.
 This API allows users to create, manage, and vote on questions, providing a flexible and scalable solution for polling needs.

## Features
- Creation of questions with multiple options
- Adding, editing, and deleting options
- Voting on options within a question
- Comprehensive error handling for various scenarios
- Easy-to-use RESTful endpoints

## Installation Guide
Prerequisites
- Node.js (v14.0.0 or higher)
- MongoDB

## Setup Steps
1. Clone the repository:
- git clone <repository-url>
- cd polling-system-api

2. Install dependencies:
- npm install

3. Set up environment variables:
- Create a .env file in the root directory.
- Add the following environment variables:
- PORT=8000
- MONGO_DB=<your-mongodb-connection-string>

4. Start the server:
- npm start

## API Routes
* Create a Question:
* Endpoint: POST /api/questions/create
* Body: { "title": "Your Question Title" }

### Add Option to Question:
* Endpoint: POST /api/questions/:id/options/create
* Params: id (Question ID)
* Body: { "text": "Your Option Text" }

### Get Question by ID:
* Endpoint: GET /api/questions/:id
* Params: id (Question ID)

### Delete Question by ID:
* Endpoint: DELETE /api/questions/:id/delete
* Params: id (Question ID)
* Options

### Delete Option by ID:
* Endpoint: DELETE /api/options/:id/delete
* Params: id (Option ID)

### Add Vote to Option:
* Endpoint: GET /api/options/:id/add_vote
* Params: id (Option ID)

# You can get the github repository of this project also.
Github Repository:- https://github.com/ParmodKumar28/Polling-System-API
Youtube Video:- https://youtu.be/7m4eu4MtjRQ?si=9UuMu9IAeeUwcRUo
Hosted Url:- https://polling-system-api-50ap.onrender.com/
