const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('mongoose');
const path = require('path');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const Chatroom = require('../models/chatroomModel');
const Message = require('../models/messageModel');

exports.create = [
  upload.single('file'),
  body('content', 'Message Content is required').trim().notEmpty(),
  // body('img')
  //   .optional()
  //   .custom((val) => {
  //     const fileExtension = path.extname(val.name).toLowerCase();
  //     if (fileExtension !== '.jpg' && fileExtension !== '.png' && fileExtension !== '.jpeg') {
  //       throw new Error('Invalid file type. Only .jpg, .png, and .jpeg are allowed');
  //     }
  //     // Indicates the success of this synchronous custom validator
  //     return true;
  //   }),
  body('chatroom', 'Chatroom ID is required')
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value))
    .withMessage('Invalid Chatroom'),

  asyncHandler(async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ err: errors.array(), type: 'bodyValidation' });

    const chatroom = await Chatroom.findById(req.body.chatroom);
    if (!chatroom) return res.status(404).json({ err: 'Chatroom not found' });

    if (!chatroom.participants.includes(req.user._id)) return res.status(401).json({ err: 'You are not in that chatroom' });

    const newMessage = new Message({ content: req.body.content, author: req.user._id, chatroom: req.body.chatroom, imgUrl: req.body.imgUrl || null });
    await newMessage.save();

    await Chatroom.findByIdAndUpdate(req.body.chatroom, { $push: { messages: newMessage._id } });

    return res.json(newMessage);
  })
];
