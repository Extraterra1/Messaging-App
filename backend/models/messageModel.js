const { default: mongoose, Schema } = require('mongoose');

const messageModel = new Schema({
  content: {
    type: String,
    trim: true,
    required: true
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  imgUrl: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Message', messageModel);
