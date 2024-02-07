import { loginPOST } from '../controllers/authController';
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ msg: 'Welcome!' });
});

// POST Login
router.post('/login', loginPOST);

module.exports = router;
