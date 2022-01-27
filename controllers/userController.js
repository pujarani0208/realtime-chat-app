const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.getAllUsers = (req, res) => {
    const userMap = [];
    User.find({}, (err, users) => {
        users.forEach((user) => {
            userMap.push({userId: user.id, userName: user.name, userPhoto: user.photo})
        })
        res.render('getAllUsers', {userArray : userMap});
    })
}
