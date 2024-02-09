const { default: mongoose, Schema } = require('mongoose');

const chatroomModel = new Schema({
  title: {
    type: String,
    trim: true
  },
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
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chatroom', chatroomModel);
