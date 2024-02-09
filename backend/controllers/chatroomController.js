const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('mongoose');
const Chatroom = require('../models/chatroomModel');

exports.create = [
  body('participants', 'You need to pass the members of the chatrooms')
    .notEmpty()
    .isArray({ min: 2 })
    .withMessage('There must be at least 2 members')
    .custom((value) => value.length === new Set(value).size)
    .withMessage('All participants must be unique'),
  body('participants.*')
    .custom((value) => isValidObjectId(value))
    .withMessage('Invalid User ID'),
  body('title', 'Title cannot be longer than 15 characters').optional().isLength({ max: 15 }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ err: errors.array(), type: 'bodyValidation' });

    const newChatroom = new Chatroom({
      participants: req.body.participants
    });

    if (req.body.title) newChatroom.title = req.body.title;

    await newChatroom.save();

    return res.json({ newChatroom });
  })
];
