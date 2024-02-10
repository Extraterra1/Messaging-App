const passport = require('passport');
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const chatroomController = require('../controllers/chatroomController');

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

router.post('/chatrooms', chatroomController.create);

router.delete('/chatrooms/:id', passport.authenticate('jwt', { session: false }), chatroomController.delete);

router.patch('/chatrooms/:id', passport.authenticate('jwt', { session: false }), chatroomController.edit);

module.exports = router;
