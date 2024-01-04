const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { likeService } = require('../services');
const catchModelErrors = require('../utils/catchModelErrors');

const createLike = catchAsync(catchModelErrors(async (req, res) => {
  const like = await likeService.createLike(req.body);
  res.status(httpStatus.CREATED).send(like);
}));

const getLikes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await likeService.queryLikes(filter, options);
  res.send(result);
});

const getLike = catchAsync(async (req, res) => {
  const like = await likeService.getLikeById(req.params.likeId);
  if (!like) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Like not found');
  }
  res.send(like);
});

const deleteLike = catchAsync(async (req, res) => {
  await likeService.deleteLikeById(req.params.likeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLike,
  getLikes,
  getLike,
  deleteLike,
};
