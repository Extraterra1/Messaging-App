const passport = require('passport');
const express = require('express');
const router = express.Router();

const { loginPOST, registerPOST, protectedRoute } = require('../controllers/authController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ msg: 'Welcome!' });
});

// Mockup Protected Route
router.get('/protected', passport.authenticate('jwt', { session: false }), protectedRoute);

// POST Login
router.post('/login', loginPOST);

// POST Register
router.post('/register', registerPOST);

module.exports = router;
