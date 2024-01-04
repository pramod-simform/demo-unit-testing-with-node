const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const likeSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
likeSchema.plugin(toJSON);
likeSchema.plugin(paginate);

/**
 * @typedef Like
 */
const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
