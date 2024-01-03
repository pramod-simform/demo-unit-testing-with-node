const httpStatus = require('http-status');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a comment
 * @param {Object} blogBody
 * @returns {Promise<Comment>}
 */
const createComment = async (blogBody) => {
  return Comment.create(blogBody);
};

/**
 * Query for comments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryComment = async (filter, options) => {
  const comments = await Comment.paginate(filter, options);
  return comments;
};

/**
 * Get comment by id
 * @param {ObjectId} id
 * @returns {Promise<Comment>}
 */
const getCommentById = async (id) => {
  return Comment.findById(id);
};

/**
 * Update comment by id
 * @param {ObjectId} blogId
 * @param {Object} updateBody
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (blogId, updateBody) => {
  const comment = await getCommentById(blogId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  Object.assign(comment, updateBody);
  await comment.save();

  return comment;
};

/**
 * Delete comment by id
 * @param {ObjectId} blogId
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (blogId) => {
  const comment = await getCommentById(blogId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'comment not found');
  }
  await comment.remove();
  return comment;
};

module.exports = {
  createComment,
  queryComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
