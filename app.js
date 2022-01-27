const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const app = express();

const AppError = require('./utils/appError');
const router = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());

app.use('/api', router);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;