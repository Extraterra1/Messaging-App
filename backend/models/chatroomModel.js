const { default: mongoose, Schema } = require('mongoose');

const chatroomModel = new Schema({
  participants: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  ],
  messages: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Chatroom', chatroomModel);
