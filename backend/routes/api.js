const passport = require('passport');
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const chatroomController = require('../controllers/chatroomController');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const friendRequestController = require('../controllers/friendRequestController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ msg: 'Welcome!' });
});

// Mockup Protected Route
router.get('/protected', passport.authenticate('jwt', { session: false }), authController.protectedRoute);

// ***************************
// AUTH
//  **************************

// POST Login
router.post('/login', authController.loginPOST);

// POST Register
router.post('/register', authController.registerPOST);

// ***************************
// CHATROOMS
//  **************************

// Create Chatroom
router.post('/chatrooms', passport.authenticate('jwt', { session: false }), chatroomController.create);

// Update Chatroom
router.patch('/chatrooms/:id', passport.authenticate('jwt', { session: false }), chatroomController.edit);

// Delete Chatroom
router.delete('/chatrooms/:id', passport.authenticate('jwt', { session: false }), chatroomController.delete);

// ***************************
// USERS
//  **************************

router.get('/users/:id/chatrooms', passport.authenticate('jwt', { session: false }), userController.getChats);

// ***************************
// MESSAGES
//  **************************

// Create Message
router.post('/messages', passport.authenticate('jwt', { session: false }), messageController.create);

// ***************************
// FRIEND REQUESTS
//  **************************

//  Send Friend Request
router.post('/friendRequests', passport.authenticate('jwt', { session: false }), friendRequestController.create);

// Get User's pending received friend requests
router.get('/friendRequests/:id', passport.authenticate('jwt', { session: false }), friendRequestController.getPendingRequests);

module.exports = router;
