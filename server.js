const dotenv = require('dotenv');
const mongoose = require('mongoose');

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
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Application is running on http://localhost:${port}`);
});

const DB_URL = process.env.SERVER_URL

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection Successfully!');
}).catch((e) => {
    console.log(e)
});


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});




