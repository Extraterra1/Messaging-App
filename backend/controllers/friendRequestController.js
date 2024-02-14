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
