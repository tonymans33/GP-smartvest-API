const dotenv = require('dotenv');

var app = require('./app');


dotenv.config({
    path: './.env'
});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Application is running on http://localhost:${port}`);
});


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});




