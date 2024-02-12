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
    .withMessage('Invalid Chatroom'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ err: errors.array(), type: 'bodyValidation' });

    const chatroom = await Chatroom.findById(req.body.chatroom);
    if (!chatroom) return res.status(404).json({ err: 'Chatroom not found' });

    const newMessage = new Message({ content: req.body.content, author: req.user._id, chatroom: req.body.author, imgUrl: req.body.imgUrl || null });
    await newMessage.save();

    await Chatroom.findByIdAndUpdate(req.body.chatroom, { $push: { messages: newMessage._id } });

    return res.json(newMessage);
  })
];
