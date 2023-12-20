# Payment System

This repository houses the codebase for our payment system. This system is designed to manage a wide array of transactions, with a special emphasis on identifying and reporting users with fraudulent UPI numbers. In addition to this, it also include a feature of secure authentication mechanism, among others.

## Features

- Authentication: Enables user registration and login.
- Transactions: Allows authorized users to make transactions.
- Reporting Users: Provides the ability to report fraudulent UPI numbers.

## Technologies Used

- Next.js: The frontend of our payment system is built using Next.js, a powerful React framework that enables features such as server-side rendering and generating static websites for React based web applications.

- Express.js: Our backend is constructed with Express.js, a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- MongoDB: We use MongoDB as our primary database to store all transactional and user data. MongoDB is a source-available cross-platform document-oriented database program, known for its high scalability and flexibility.

- Shadcn: This is the library we use for our frontend components. It provides a set of pre-designed components that can be used to create interactive user interfaces.

- Zod: We use Zod for form validation. It's a library for creating, manipulating, and validating JavaScript schemas. It ensures that the data entered by users in forms meets the required format and criteria.

## Code Structure

The code is structured as follows:

1. Frontend:

- frontend/app/: This directory serves as the entry point for the frontend application and all the routes and layout files for the Next.js application.
- frontend/Components/: This directory contains all the components utilized in the frontend.
- frontend/contexts/: This directory contains the authentication context for the application.
- frontend/services/: This directory contains services for the APIs.

2. Backend:

- backend/index.js: This file is the entry point for the application's backend.
- backend/routes: This directory contains the routes for authentication and payments, each with different endpoints.
- backend/models: This directory contains the Mongoose models for the user, payments, and fraud detection.
- env: This directory contains the environment variables, which include secret constants.
   

## Getting Started

Here's how you can use this repository:

Install and run locally my-project with npm

```bash
  Installation for Frontend
  > cd frontend
  > npm i (Should have nodejs version >= v18.17.0)
  > npm run dev
```

```bash
  Installation for Backend
  > cd backend
  > npm i 
  > create a .env file and add MONGO_URL varaibale (For example: MONGO_URL="mongodb+srv://username:password@cluster0.6u2l6tl.mongodb.net/database_name")
  > npm run start
```
