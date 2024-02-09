const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('mongoose');

exports.create = [
  body('participants', 'You need to pass the members of the chatrooms').isArray().isLength({ min: 2 }).withMessage('There must be at least 2 members'),
  body('participants.*')
    .custom((value) => {
      return isValidObjectId(value);
    })
    .withMessage('Invalid User ID'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ err: errors.array(), type: 'bodyValidation' });

    return res.json({ participants: req.body.participants });
  })
];
