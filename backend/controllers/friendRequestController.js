const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('mongoose');

const User = require('../models/userModel');
const FriendRequest = require('../models/friendRequestModel');

exports.create = [
  body('recipient', 'Invalid Recipient')
    .notEmpty()
    .custom((value) => isValidObjectId(value))
    .withMessage('Recipient not found'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ err: errors.array(), type: 'bodyValidation' });

    const recipient = await User.findById(req.body.recipient);
    if (!recipient) return res.status(404).json({ err: 'Recipient not found' });

    const alreadyFriends = recipient.friends.some((e) => e.user.equals(req.body.recipient));
    if (alreadyFriends) return res.status(409).json({ err: 'Users are already friends' });

    const existingFriendRequest = await FriendRequest.findOne({ recipient: req.body.recipient, sender: req.user._id, status: 'pending' });
    if (existingFriendRequest) return res.status(422).json({ err: 'There is a previous pending friend request' });

    const newFriendRequest = new FriendRequest({ recipient: req.body.recipient, sender: req.user._id });
    await newFriendRequest.save();

    return res.json({ newFriendRequest });
  })
];

exports.getPendingRequests = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(404).json({ err: 'User not found' });

  if (req.params.id !== req.user._id.toString()) return res.status(401).json({ err: 'You are not authorized' });

  const pendingFR = await FriendRequest.find({ recipient: req.user._id, status: 'pending' });

  return res.json({ pendingFR });
});

exports.accept = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(404).json({ err: 'Friend Request not found' });

  const friendRequest = await FriendRequest.findById(req.params.id);
  if (!friendRequest) return res.status(404).json({ err: 'Friend Request not found' });

  if (!friendRequest.recipient.equals(req.user._id)) return res.status(401).json({ err: 'You are not authorized' });
  return res.json({ user: req.user });
});
