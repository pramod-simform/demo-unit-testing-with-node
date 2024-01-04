const httpStatus = require('http-status');
const { Like } = require('../models');
const ApiError = require('../utils/ApiError');
const { Types } = require('mongoose');

/**
 * Create a like or delete if already exists
 * @param {Object} likeBody
 * @returns {Promise<Like>}
 */
const createLike = async (likeBody) => {
  const like = await Like.findOneAndUpdate(
    {
      userId: Types.ObjectId(likeBody.userId),
      postId: Types.ObjectId(likeBody.postId),
    },
    {},
    {
      upsert: true,
      new: true,
      rawResult: true,
    }
  );

  if (like?.lastErrorObject?.updatedExisting) {
    await Like.deleteOne({
      _id: like.value._id,
    });
  }
  return true;
};

/**
 * Query for likes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLikes = async (filter, options) => {
  const likes = await Like.paginate(filter, options);
  return likes;
};

/**
 * Get like by id
 * @param {ObjectId} id
 * @returns {Promise<Like>}
 */
const getLikeById = async (id) => {
  return Like.findById(id);
};

/**
 * Delete like by id
 * @param {ObjectId} likeId
 * @returns {Promise<Like>}
 */
const deleteLikeById = async (likeId) => {
  const like = await getLikeById(likeId);
  if (!like) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Like not found');
  }
  await like.remove();
  return like;
};

module.exports = {
  createLike,
  queryLikes,
  getLikeById,
  deleteLikeById,
};
