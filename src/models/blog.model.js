const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

/**
 * Check if blog is unique by title
 * @param {string} title - The blog's title
 * @param {ObjectId} [excludeBlogId] - The id of the blog to be excluded
 * @returns {Promise<boolean>}
 */
blogSchema.statics.isBlogExistsWitTitle = async function (title, blogId) {
  const blog = await this.findOne({ title, _id: { $ne: blogId } });
  return !!blog;
};

/**
 * @typedef Blog
 */
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
