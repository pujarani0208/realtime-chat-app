const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chatController = require('./controllers/chatController');

/*
process.on('uncaughtException', err => {
    console.log('Uncaught Exception ! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})
*/

dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace(
    'PASSWORD',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB)
    .then(console.log('DB connection successful !'))
    .catch((err) => console.log(err))

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>{
    console.log(`App running on port ${port}...`);
});

// chat server
const io = require('socket.io')(server);
chatController(io);

process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
