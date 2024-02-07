const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.loginPOST = [
  body('username', 'Bad request').trim().isLength({ min: 2 }).optional(),
  body('email', 'Bad request').trim().isEmail().optional(),
  body('password', 'Bad request').required(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ err: errors.array()[0].msg });
  })
];
