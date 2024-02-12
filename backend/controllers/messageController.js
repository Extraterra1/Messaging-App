const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('mongoose');

const Chatroom = require('../models/chatroomModel');
const Message = require('../models/messageModel');

exports.create = [
  body('content', 'Message Content is required').trim().notEmpty(),
  body('imgUrl', 'Image must be a URL').optional().trim().isURL(),
  body('chatroom', 'Chatroom ID is required')
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value))
    .withMessage('Invalid Chatroom')
];
