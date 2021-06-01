const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const errorHanlder = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

// Setting environment variables
dotenv.config({ path: './config/config.env' });

// Setting up the database
require('./config/db')();

// Using express
const app = express();

// Using cookie parser
app.use(cookieParser('fazefa'));

// Bringing up all specific routes
const books = require('./routes/books');
const users = require('./routes/users');
const auth = require('./routes/auth');

// Body Parser
app.use(express.json());

// Setting up routers
app.use('/api/v1/books', books);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

// Using the error handler
app.use(errorHanlder);

// Setting the port
const PORT = process.env.PORT || 5000;

// Starting the server
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`.yellow.bold.underline);
});

// Handling unhandled rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Closing the server and killing the process
    server.close(() => process.exit(1));
});
