const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const chatController = require('./../controllers/chatController')

const {picUpload } = require('./../utils/sendPic');

const router = express.Router();

// Showing home page
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/getAllUsers', userController.getAllUsers);

// Showing signup form
router.get('/signup', (req, res) => {
    res.render('signup-form');
})
router.post('/signup', picUpload, authController.signup);

// Showing login form
router.get('/login', (req, res) => {
    res.render('login-form');
});
router.post('/login', authController.login);


router.get('/logout', authController.logout);

// Showing forgot password page
router.get('forgotPassword', (req, res) => {
    res.render('forgotPassword');
});
router.post('/forgotPassword', authController.forgotPassword);

// Showing Password reset page
router.get('/resetPassword/:token', (req, res) => {
    res.render(resetPassword);
});
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/dashboard', authController.isLoggedIn, (req, res) => {
    res.render(dashboard)
})

router.get('/getUser/:id', userController.getMe);


router.get('/chat', authController.isLoggedIn, (req, res) => {
    res.render('chat', {user: user})
})

module.exports = router;