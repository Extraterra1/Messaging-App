// const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('mongoose');

const Chatroom = require('../models/chatroomModel');
// const User = require('../models/userModel');

exports.getChats = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(404).json({ err: 'User not found' });

  if (!req.user._id.equals(req.params.id) && req.user.username !== 'admin') return res.status(401).json({ err: 'You need to be an admin to do that' });

  const chatrooms = await Chatroom.find({ participants: req.params.id })
    .populate({ path: 'participants', select: '-password' })
    .populate({ path: 'messages', populate: { path: 'author', select: '-password' } });

  return res.json({ chatrooms, count: chatrooms.length });
});
